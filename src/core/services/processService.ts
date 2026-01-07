import { useAppStackStore } from "@core/store/useAppStackStore"
import { useProcessStore } from "@core/store/useProcessStore"
import { appCardService } from "@features/app-card/services/appCardService"
import { LauncherMetadata, isLauncherProgramTarget } from "@features/launcher/types"
import { getProgramMeta } from "@features/program/registry"
import { ProgramId } from "@features/program/types"
import { windowService } from "@features/window/services/windowService"
import { useWindowStore } from "@features/window/store/useWindowStore"
import { osService } from "./osService"
import { panelService } from "./panelService"
import { debugMessage } from "@shared/utils/utils"
import { launcherService } from "@features/launcher/services/launcherService"

export const processService = {
  getProcess: (processId: number) => useProcessStore.getState().processes[processId],
  getProcessesByProgramId: (programId: ProgramId) =>
    useProcessStore.getState().processesByProgramId[programId],

  startProcess: (launcherMeta: LauncherMetadata) => {
    const { getNextProcessId, addProcess } = useProcessStore.getState()
    const { addWindow } = useWindowStore.getState()
    const { addAppCard } = useAppStackStore.getState()

    const isDesktop = osService.isDesktop()

    debugMessage("Starting process for launcher", launcherMeta, isDesktop)

    if (!isLauncherProgramTarget(launcherMeta.target)) {
      debugMessage("Launcher target is not a program. Cannot start process.", launcherMeta)
      return
    }

    const { args, programId } = launcherMeta.target

    const programMeta = getProgramMeta(programId)

    if (programMeta.runnable === false) {
      debugMessage(`Program ${programId} is not runnable. Cannot start process.`)
      return
    }

    const title = typeof args?.title === "string" ? args?.title : programMeta.name
    const processId = getNextProcessId()

    if (isDesktop) {
      const window = windowService.createWindow(processId, programMeta.window, title)
      addProcess(processId, launcherMeta, window.id)
      addWindow(window)
      if (!programMeta.window?.isEphemeral) {
        panelService.addLauncher(launcherMeta, false, window.id)
      }
    } else {
      const appCard = appCardService.createAppCard(processId, title)
      addProcess(processId, launcherMeta, appCard.id)
      addAppCard(appCard)

      // Push a dummy state to the history stack to prevent the back button from exiting the site.
      // The NavigationControls component handles popstate events to handle back navigation.
      window.history.pushState({ processRunning: true }, "")
    }
  },

  stopProcess: (processId: number) => {
    const { removeProcess, processes, processesByProgramId } = useProcessStore.getState()
    const { removeWindow } = useWindowStore.getState()
    const { removeAppCard } = useAppStackStore.getState()
    const { programId, displayId } = processes[processId]
    const isDesktop = osService.isDesktop()

    if (isDesktop) {
      if (processesByProgramId[programId]?.length <= 1) {
        launcherService.removeFromGridWithProgramId("panel", programId, true)
      }

      removeWindow(displayId)
    } else {
      removeAppCard(displayId)
    }

    removeProcess(processId)
  },

  stopAllProcesses: () => {
    const { processes } = useProcessStore.getState()
    Object.keys(processes).forEach((processId) => {
      processService.stopProcess(Number(processId))
    })
    useProcessStore.getState().reset()
  },

  stopProcessesWithProgramId: (programId: ProgramId) => {
    const { processesByProgramId } = useProcessStore.getState()

    if (!processesByProgramId[programId]) {
      return
    }

    processesByProgramId[programId].forEach((process) => {
      processService.stopProcess(process.id)
    })
  },

  getRunningCountForProgramId: (programId: ProgramId | undefined) => {
    const { processesByProgramId } = useProcessStore.getState()

    if (!programId || !processesByProgramId[programId]) {
      return 0
    }

    return processesByProgramId[programId].length
  },
}
