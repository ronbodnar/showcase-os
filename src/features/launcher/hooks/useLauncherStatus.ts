import { useProcessStore } from "@core/store/useProcessStore"
import { useDesktopStore } from "@features/environments/desktop/store/useDesktopStore"
import { useWindowStore } from "@features/window/store/useWindowStore"
import { GridLauncherState, isLauncherProgramTarget } from "../types"

export const useLauncherStatus = (launcher: GridLauncherState | undefined) => {
  const isSelected = useDesktopStore((state) =>
    launcher?.id ? state.isSelectedLauncher(launcher.id) : false,
  )

  const isWindowFocused = useWindowStore((state) => {
    const focusedWindowId = state.zOrder.length > 0 ? state.zOrder[state.zOrder.length - 1] : ""
    if (focusedWindowId && state.windows[focusedWindowId]?.isMinimized) {
      return false
    }

    return launcher?.displayIds?.includes(focusedWindowId) ?? false
  })

  const runningProgramCount = useProcessStore((state) => {
    const target = launcher?.meta.target
    const isProgramLauncher = isLauncherProgramTarget(target)
    if (!isProgramLauncher) {
      return 0
    }

    return state.processesByProgramId[target.programId]?.length
  })

  const isProgramRunning = runningProgramCount > 0

  return { isSelected, isWindowFocused, isProgramRunning, runningProgramCount }
}
