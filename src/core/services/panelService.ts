import { v4 as uuidv4 } from "uuid"
import { useProcessStore } from "@core/store/useProcessStore"
import { useLauncherStore } from "@features/launcher/store/useLauncherStore"
import { LauncherMetadata, isLauncherActionTarget } from "@features/launcher/types"
import {
  sameProgramTarget,
  sameActionTarget,
  getProgramMetaFromTarget,
} from "@features/launcher/utils/launcher.utils"
import { ProgramId } from "@features/program/types"
import { debugMessage } from "@shared/utils/utils"
import { launcherService } from "@features/launcher/services/launcherService"

export const panelService = {
  addLauncherById: (id: string, pinned: boolean) => {
    const launcher = useLauncherStore.getState().launchersById[id]
    if (!launcher) {
      debugMessage(`Launcher with ID ${id} is not found`)
      return
    }
    panelService.addLauncher(launcher.meta, pinned)
  },

  addLauncher: (launcherMeta: LauncherMetadata, pinned: boolean, windowId?: string) => {
    const { addLauncher, updateLauncher, launchersByGrid } = useLauncherStore.getState()
    const panelLaunchers = launchersByGrid["panel"] || []
    const existingLauncher = panelLaunchers.find(
      (l) =>
        sameProgramTarget(l.meta.target, launcherMeta.target) ||
        sameActionTarget(l.meta.target, launcherMeta.target),
    )

    if (existingLauncher) {
      if (!existingLauncher.displayIds) {
        existingLauncher.displayIds = []
      }
      if (windowId) {
        existingLauncher.displayIds.push(windowId)
      }

      // Only update pinned state if it's explicitly set to true
      // Otherwise, starting a program will set it to false, then it will be deleted when closing all windows.
      // Maybe this is just a workaround for the current implementation?
      if (pinned === true) {
        existingLauncher.isPinned = pinned
      }

      updateLauncher("panel", existingLauncher)
      return
    }

    addLauncher("panel", {
      id: uuidv4(),
      meta: launcherMeta,
      gridId: "panel",
      isPinned: pinned,
      displayIds: windowId ? [windowId] : [],
      position: { x: panelLaunchers.length, y: 0 },
    })
  },

  unpinLauncher: (id: string) => {
    const { removeLauncher, updateLauncher, reorderLaunchersAfterRemoval, launchersByGrid } =
      useLauncherStore.getState()
    const { processesByProgramId } = useProcessStore.getState()
    const panelLaunchers = launchersByGrid["panel"] || []

    const launcher = panelLaunchers.find((l) => l.id === id)
    if (!launcher) {
      debugMessage(`Launcher with ID ${id} is not found`)
      return
    }

    launcher.isPinned = false

    if (isLauncherActionTarget(launcher.meta.target)) {
      removeLauncher("panel", id)
      reorderLaunchersAfterRemoval("panel", launcher.position)
      return
    }

    const programMeta = getProgramMetaFromTarget(launcher.meta.target)
    if (programMeta) {
      const programId = programMeta.id as ProgramId
      const runningProcesses = processesByProgramId[programId]
      if (!runningProcesses || runningProcesses.length === 0) {
        launcherService.removeFromGridWithProgramId("panel", programId, true)
        return
      }
    }

    updateLauncher("panel", launcher)
  },
}
