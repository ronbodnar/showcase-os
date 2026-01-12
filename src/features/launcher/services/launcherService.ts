import { osService } from "@core/services/osService"
import { overlayService } from "@core/services/overlayService"
import { processService } from "@core/services/processService"
import { useAppStackStore } from "@core/store/useAppStackStore"
import { useProcessStore } from "@core/store/useProcessStore"
import { useDesktopStore } from "@features/environments/desktop/store/useDesktopStore"
import { useGridStore } from "@features/grid/store/useGridStore"
import { GridId } from "@features/grid/types"
import { useLauncherStore } from "@features/launcher/store/useLauncherStore"
import {
  LauncherMetadata,
  isLauncherProgramTarget,
  isLauncherActionTarget,
} from "@features/launcher/types"
import { getProgramMetaFromTarget } from "@features/launcher/utils/launcher.utils"
import { executeAction } from "@features/os/actions/systemRegistry"
import { getProgramMeta } from "@features/program/registry"
import { ProgramId } from "@features/program/types"
import { windowService } from "@features/window/services/windowService"
import { useWindowStore } from "@features/window/store/useWindowStore"
import { debugMessage } from "@shared/utils/utils"

export const launcherService = {
  lastClickPosition: { x: -9999, y: -9999 },

  openLauncher: (meta: LauncherMetadata, isPanel: boolean = false) => {
    const { target } = meta

    overlayService.hideOverlay()
    if (target.type !== "program" || target.programId !== "start_menu") {
      windowService.tryCloseEphemeralWindow({ x: -9999, y: -9999 })
    }

    if (handleActionLauncher(meta)) {
      return
    }

    handleProgramLauncher(meta, isPanel)
  },

  openLauncherById: (id: string) => {
    const launcher = useLauncherStore.getState().launchersById[id]
    if (!launcher) {
      debugMessage(`Launcher with id "${id}" is not found`)
      return
    }

    launcherService.openLauncher(launcher.meta)
  },

  handleLauncherClick: (
    e: React.PointerEvent | React.MouseEvent,
    meta: LauncherMetadata,
    id?: string,
    gridId?: GridId,
  ) => {
    e.stopPropagation()

    if (e.button !== 0 || meta.disabled) {
      return
    }

    launcherService.lastClickPosition = { x: e.clientX, y: e.clientY }

    const pointerType = e.type === "pointerup" ? "up" : "down"
    const isPanel = gridId === "panel"

    // Panel and non-grid launchers cannot be selected, so we can open and avoid updating the last action id.
    if (gridId === undefined || isPanel) {
      if (pointerType === "up") {
        launcherService.openLauncher(meta, isPanel)
      }
      return
    }

    if (id === undefined) {
      debugMessage("Clicked launcher does not have an ID and cannot be opened.")
      return
    }

    const { lastActionId, lastActionTimestamp, selectLauncher, setLastActionId } =
      useDesktopStore.getState()

    if (pointerType === "down") {
      selectLauncher(id)
      overlayService.hideOverlay()
      return
    }

    const now = Date.now()
    const isDoubleClick = now - lastActionTimestamp < 400 && lastActionId === id
    if (isDoubleClick) {
      launcherService.openLauncher(meta, isPanel)
    } else {
      selectLauncher(id)
      overlayService.hideOverlay()
    }

    // Click tracking is updated on pointer up because it is ran after pointerdown event.
    // If it's set on pointer down, clickUp happens shortly after, causing the launcher to execute on a single click.
    setLastActionId(id)
  },

  removeFromGridWithProgramId: (
    gridId: GridId,
    programId: ProgramId,
    reorderLaunchers?: boolean,
  ) => {
    const { removeLauncher, reorderLaunchersAfterRemoval, launchersByGrid } =
      useLauncherStore.getState()

    const launchers = launchersByGrid[gridId] || []
    if (launchers.length === 0) {
      return
    }

    const launcher = launchers.find(
      (l) => getProgramMetaFromTarget(l.meta.target)?.id === programId,
    )
    if (!launcher) {
      debugMessage(`Launcher with program ${programId} is not found`)
      return
    }

    if (launcher.isPinned) {
      return
    }

    const programLauncherIds = launchers
      .filter((l) => getProgramMetaFromTarget(l.meta.target)?.id === programId)
      .map((l) => l.id)

    programLauncherIds.forEach((id) => removeLauncher(gridId, id))

    if (reorderLaunchers) {
      reorderLaunchersAfterRemoval(gridId, launcher.position)
    }
  },

  closeWindows: (id: string) => {
    const launcher = useLauncherStore.getState().launchersById[id]
    const launcherTarget = launcher?.meta.target
    if (isLauncherProgramTarget(launcherTarget)) {
      processService.stopProcessesWithProgramId(launcherTarget.programId)
    }
  },

  deleteFromGrid: (gridId: GridId, id: string) => {
    useLauncherStore.getState().removeLauncher(gridId, id)
  },
}

function handleProgramLauncher(meta: LauncherMetadata, isPanel: boolean) {
  const { processesByProgramId } = useProcessStore.getState()
  const { focusWindow } = useWindowStore.getState()
  const { setActiveCard } = useAppStackStore.getState()
  const { setEphemeralWindowId } = useDesktopStore.getState()
  const { target } = meta
  const isDesktop = osService.isDesktop()

  if (!isLauncherProgramTarget(target)) {
    return
  }

  const { programId, args } = target
  const programMeta = getProgramMeta(programId)

  // If the program has details isn't runnable, it's for the Software Center.
  if (programMeta.runnable === false && programMeta.details) {
    handleProgramLauncher(
      {
        target: {
          type: "program",
          programId: "software_center",
          args: {
            program: programId,
          },
        },
      },
      false,
    )
    return
  }

  const programProcesses = processesByProgramId[programId]

  if (isPanel && programProcesses?.length > 0) {
    if (programProcesses.length === 1) {
      if (programMeta.window?.isEphemeral && isDesktop) {
        setEphemeralWindowId(programProcesses[0].displayId)
      }
      windowService.focusOrMinimizeWindow(programProcesses[0].displayId)
    } else if (programProcesses.length > 1) {
      const panelPositionY = useGridStore.getState().grids["panel"]?.position?.y ?? 0
      overlayService.showOverlay("windowPreview", {
        windowIds: programProcesses.map((p) => p.displayId),
        position: { x: launcherService.lastClickPosition.x, y: panelPositionY },
      })
    }
    return
  }

  const sameArgs = (a: Record<string, unknown>, b: Record<string, unknown>) => {
    const keys = new Set([...Object.keys(a ?? {}), ...Object.keys(b ?? {})])
    for (const key of keys) {
      if (a[key] !== b[key]) return false
    }
    return true
  }

  const exactMatch = programProcesses?.find(
    (p) =>
      isLauncherProgramTarget(p.launcher.target) &&
      sameArgs(p.launcher.target.args ?? {}, args ?? {}),
  )

  if (exactMatch && programMeta.allowMultipleInstances !== true) {
    if (isDesktop) {
      focusWindow(exactMatch.displayId)
    } else {
      setActiveCard(exactMatch.displayId)
    }
    return
  }

  processService.startProcess(meta)
}

function handleActionLauncher(meta: LauncherMetadata) {
  const { target } = meta
  if (isLauncherActionTarget(target)) {
    executeAction(target.action, target.args)
    return true
  }
  return false
}
