import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { GridId } from "@features/grid/types"
import { GridCellPosition } from "types"
import { DEFAULT_LAUNCHER_CONFIGS } from "../defaultLayouts"
import { GridLauncherState } from "../types"
import { updateGridAndId, getDefaultLauncherState } from "../utils/launcher.utils"
import { debugMessage } from "@shared/utils/utils"

export const LAUNCHER_STORE_NAME = "launcher-store"

interface State {
  launchersById: Record<string, GridLauncherState>
  launchersByGrid: Record<GridId, GridLauncherState[]>
}

interface Action {
  reset: () => void
  addLauncher: (gridId: GridId, launcher: GridLauncherState) => void
  updateLauncher: (gridId: GridId, launcher: GridLauncherState) => void
  removeLauncher: (gridId: GridId, launcherId: string) => void
  setLaunchers: (gridId: GridId, launchers: GridLauncherState[]) => void
  moveLauncher: (
    gridId: GridId,
    fromPosition: GridCellPosition,
    toPosition: GridCellPosition,
  ) => void
  resetLaunchers: (gridId: GridId) => void
  reorderLaunchersAfterRemoval: (gridId: GridId, removedPosition: GridCellPosition) => void
}

export type LauncherStore = State & Action

const defaultState: State = {
  launchersById: {} as Record<string, GridLauncherState>,
  launchersByGrid: {} as Record<GridId, GridLauncherState[]>,
}

export const useLauncherStore = create<LauncherStore>()(
  devtools(
    persist(
      (set, _get) => ({
        ...defaultState,

        reset: () => set(defaultState),

        addLauncher: (gridId, launcher) =>
          set((state) => {
            const updatedLaunchers = [...(state.launchersByGrid[gridId] || []), launcher]
            return updateGridAndId(state, gridId, updatedLaunchers)
          }),

        updateLauncher: (gridId, launcher) =>
          set((state) => {
            const updatedLaunchers = state.launchersByGrid[gridId]?.map((l) =>
              l.id === launcher.id ? launcher : l,
            )
            return updateGridAndId(state, gridId, updatedLaunchers)
          }),

        removeLauncher: (gridId, launcherId) =>
          set((state) => {
            const launchers = state.launchersByGrid[gridId] || []
            const updatedGridLaunchers = launchers.filter((l) => l.id !== launcherId)

            const updatedLaunchersById = { ...state.launchersById }
            delete updatedLaunchersById[launcherId]

            return {
              launchersByGrid: { ...state.launchersByGrid, [gridId]: updatedGridLaunchers },
              launchersById: updatedLaunchersById,
            }
          }),

        setLaunchers: (gridId, launchers) =>
          set((state) => updateGridAndId(state, gridId, launchers)),

        moveLauncher: (gridId, fromPosition, toPosition) =>
          set((state) => {
            const launchers = state.launchersByGrid[gridId] || []
            const fromIndex = launchers.findIndex(
              (l) => l.position.x === fromPosition.x && l.position.y === fromPosition.y,
            )
            if (fromIndex === -1) {
              debugMessage(
                "Cannot move launcher because it is not in the grid",
                gridId,
                fromPosition,
                launchers,
                state.launchersByGrid,
              )
              return state
            }

            const toIndex = launchers.findIndex(
              (l) => l.position.x === toPosition.x && l.position.y === toPosition.y,
            )
            const updatedLaunchers = [...launchers]

            if (toIndex === -1) {
              updatedLaunchers[fromIndex] = { ...updatedLaunchers[fromIndex], position: toPosition }
            } else {
              debugMessage("Swapping launchers", fromIndex, toIndex)
              // This will swap launchers if one exists in the target position
              // There is a bug, however, where the swapped item will be hovered when the drop is complete.
              // I tried tracking hovers and resetting them, but it didn't work.
              // I also tried using an imperative approach of blocking actions while dragging, but it also didn't work.
              // You can uncomment this and swap a launcher within a grid to see it in action.
              /*
              const tempPosition = updatedLaunchers[fromIndex].position
              updatedLaunchers[fromIndex] = { ...updatedLaunchers[fromIndex], position: toPosition }
              updatedLaunchers[toIndex] = { ...updatedLaunchers[toIndex], position: tempPosition }
              */
            }

            return updateGridAndId(state, gridId, updatedLaunchers)
          }),

        resetLaunchers: (gridId: GridId) =>
          set((state) => {
            const launchers = getDefaultLauncherState(gridId, DEFAULT_LAUNCHER_CONFIGS[gridId])

            return updateGridAndId(state, gridId, launchers)
          }),

        reorderLaunchersAfterRemoval: (gridId: GridId, removedPosition: GridCellPosition) =>
          set((state) => {
            const launchers = state.launchersByGrid[gridId] || []

            const updatedLaunchers = launchers.map((l) => {
              let { x, y } = l.position

              // Shift in same row
              if (l.position.x === removedPosition.x && l.position.y > removedPosition.y) {
                y -= 1
              }

              // Shift in same column
              if (l.position.y === removedPosition.y && l.position.x > removedPosition.x) {
                x -= 1
              }

              return {
                ...l,
                position: { x, y },
              }
            })

            return updateGridAndId(state, gridId, updatedLaunchers)
          }),
      }),
      {
        name: LAUNCHER_STORE_NAME,
        partialize: (state) => {
          const stripWindowIds = (launcher: GridLauncherState) => {
            const { displayIds: _, ...rest } = launcher
            return rest
          }

          return {
            launchersById: Object.fromEntries(
              Object.entries(state.launchersById).map(([id, launcher]) => [
                id,
                stripWindowIds(launcher),
              ]),
            ),
            launchersByGrid: Object.fromEntries(
              Object.entries(state.launchersByGrid).map(([gridId, launchers]) => [
                gridId,
                launchers.map(stripWindowIds),
              ]),
            ),
          }
        },
      },
    ),
    { name: LAUNCHER_STORE_NAME },
  ),
)
