import { useGridStore } from "@features/grid/store/useGridStore"
import { GridId } from "@features/grid/types"
import { useLauncherStore } from "@features/launcher/store/useLauncherStore"
import { GridLauncherState, LauncherMetadata } from "@features/launcher/types"
import { debugMessage } from "@shared/utils/utils"
import { GridCellPosition } from "types"
import { v4 as uuidv4 } from "uuid"

export const gridService = {
  initializeLaunchers: () => {
    const { grids } = useGridStore.getState()
    const { resetLaunchers, removeLauncher, launchersByGrid } = useLauncherStore.getState()

    const entries = Object.keys(grids) as GridId[]
    entries.forEach((key) => {
      const launchers = launchersByGrid[key] ?? []
      if (launchers.length === 0) {
        resetLaunchers(key)
      } else {
        launchers.forEach((launcher) => {
          if (!launcher.isPinned) {
            debugMessage(
              `Removed launcher ${launcher.id} from grid "${key}" because it is not pinned.`,
            )
            removeLauncher(key, launcher.id)
          }
        })
      }
    })
  },

  reconcileLauncherPositions(gridId: GridId, rows: number, cols: number) {
    const { launchersByGrid, moveLauncher } = useLauncherStore.getState()
    const launchers = launchersByGrid[gridId] ?? []

    const safeLaunchers = launchers.filter((l) => l.position.x < cols && l.position.y < rows)
    const invalidLaunchers = launchers.filter((l) => l.position.x >= cols || l.position.y >= rows)

    const occupied = new Set(safeLaunchers.map((l) => `${l.position.x},${l.position.y}`))

    const tryMove = (launcher: GridLauncherState, newPos: { x: number; y: number }) => {
      const key = `${newPos.x},${newPos.y}`
      if (!occupied.has(key)) {
        moveLauncher(gridId, launcher.position, newPos)
        occupied.add(key)
        return true
      }
      return false
    }

    invalidLaunchers.forEach((launcher) => {
      let moved = false
      const { x, y } = launcher.position

      // Strategy A: Slide left
      if (x >= cols) {
        for (let nx = cols - 1; nx >= 0; nx--) {
          if (tryMove(launcher, { x: nx, y: Math.min(y, rows - 1) })) {
            moved = true
            break
          }
        }
      }
      // Strategy B: Slide up
      else if (y >= rows) {
        for (let ny = rows - 1; ny >= 0; ny--) {
          if (tryMove(launcher, { x, y: ny })) {
            moved = true
            break
          }
        }
      }

      // Strategy C: Absolute Fallback
      if (!moved) {
        const fallback = getAvailableGridPosition(
          gridId,
          Array.from(occupied).map((key) => {
            const [x, y] = key.split(",").map(Number)
            return { position: { x, y } } as GridLauncherState
          }),
        )
        if (fallback) tryMove(launcher, fallback)
      }
    })
  },

  addLauncher: (id: GridId, launcherMeta: LauncherMetadata) => {
    const { addLauncher } = useLauncherStore.getState()
    const { launchersByGrid } = useLauncherStore.getState()
    const grid = useGridStore.getState().grids[id]
    const launchers = launchersByGrid[id] ?? []
    const availablePosition = getAvailableGridPosition(id, launchers)

    if (!availablePosition) {
      debugMessage("No available position for launcher in grid:", grid)
      return
    }

    addLauncher(id, {
      id: uuidv4(),
      gridId: id,
      meta: launcherMeta,
      position: availablePosition,
      displayIds: [],
    })
  },
}

function getAvailableGridPosition(
  gridId: GridId,
  launchers: GridLauncherState[],
): GridCellPosition | undefined {
  const grid = useGridStore.getState().grids[gridId]
  const occupied = new Set(launchers.map((l) => `${l.position.x},${l.position.y}`))
  const totalCells = grid.rows * grid.cols

  for (let i = 0; i < totalCells; i++) {
    const row = grid.layoutDirection === "horizontal" ? Math.floor(i / grid.cols) : i % grid.rows
    const col = grid.layoutDirection === "horizontal" ? i % grid.cols : Math.floor(i / grid.rows)

    const key = `${col},${row}`
    if (!occupied.has(key)) {
      return { x: col, y: row }
    }
  }

  return undefined
}
