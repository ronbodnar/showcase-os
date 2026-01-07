import { useProcessStore } from "@core/store/useProcessStore"
import { useDesktopStore } from "@features/environments/desktop/store/useDesktopStore"
import { useWindowStore } from "@features/window/store/useWindowStore"
import { GridLauncherState, isLauncherProgramTarget } from "../types"

export const useLauncherStatus = (launcher: GridLauncherState | undefined) => {
  const isSelected = useDesktopStore((state) =>
    launcher?.id ? state.isSelectedLauncher(launcher.id) : false,
  )

  const isWindowFocused = useWindowStore(
    (state) => launcher?.displayIds?.includes(state.zOrder[state.zOrder.length - 1] ?? "") ?? false,
  )

  const runningProgramCount = useProcessStore((state) =>
    isLauncherProgramTarget(launcher?.meta.target)
      ? (state.processesByProgramId[launcher.meta.target.programId]?.length ?? 0)
      : 0,
  )

  const isProgramRunning = runningProgramCount > 0

  return { isSelected, isWindowFocused, isProgramRunning, runningProgramCount }
}
