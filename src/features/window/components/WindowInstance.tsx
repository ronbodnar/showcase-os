import { memo, Suspense, useCallback, useEffect, useMemo, useRef } from "react"
import { programService } from "@features/program/services/programService"
import { useProcessStore } from "@core/store/useProcessStore"
import { LauncherProgramTarget } from "@features/launcher/types"
import { useProgramComponent } from "@features/program/hooks/useProgramComponent"
import { getProgramMeta } from "@features/program/registry"
import { ContentComponent } from "@shared/components/ContentComponent"
import { ProgramLoading } from "@shared/components/ProgramLoading"
import { useDragWindow } from "../hooks/useDragWindow"
import { useResizeWindow } from "../hooks/useResizeWindow"
import { windowService } from "../services/windowService"
import { useWindowFrameRefs } from "../store/useWindowRefs"
import { useWindowStore } from "../store/useWindowStore"
import { Window } from "./Window"
import { useShallow } from "zustand/shallow"
import { debugMessage } from "@shared/utils/utils"

interface WindowInstanceProps {
  id: string
  zIndex: number
  isFocused: boolean
}

export const WindowInstance = memo(function WindowInstance({
  id,
  zIndex,
  isFocused,
}: WindowInstanceProps) {
  const windowFrameRef = useRef<HTMLDivElement>(null)
  const state = useWindowStore(useShallow((state) => state.windows[id]))

  const { processId } = state

  debugMessage("Rendering WindowInstance", state, id, useProcessStore.getState().processes)

  const process = useProcessStore((state) => state.processes[processId])
  const programMeta = getProgramMeta(process?.programId)
  const launchTarget = process?.launcher.target as LauncherProgramTarget

  const { isResizable, hideControls } = programMeta?.window ?? {}

  const focusWindow = useWindowStore((state) => state.focusWindow)
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow)
  const addWindowFrameRef = useWindowFrameRefs((state) => state.addWindowFrameRef)

  const { startResizing } = useResizeWindow(state)
  const { startDragging } = useDragWindow(id, state.position)

  const onStartDrag = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      windowService.tryCloseEphemeralWindow({ x: e.clientX, y: e.clientY })
      focusWindow(id)
      startDragging(e)
    },
    [id, startDragging, focusWindow],
  )

  const handleClose = useCallback(() => windowService.closeWindow(id), [id])
  const handleFocus = useCallback(() => focusWindow(id), [id, focusWindow])
  const handleMinimize = useCallback(() => minimizeWindow(id), [id, minimizeWindow])
  const handleMaximize = useCallback(() => windowService.maximizeOrRestoreWindow(id), [id])

  const component = useProgramComponent(process?.programId)

  debugMessage("WindowInstance component", component)

  const memoizedContentComponent = useMemo(
    () =>
      component && (
        <Suspense fallback={<ProgramLoading />}>
          <ContentComponent
            component={component}
            args={{ displayId: id, ...(launchTarget.args ?? {}) }}
          />
        </Suspense>
      ),
    [id, launchTarget.args, component],
  )

  useEffect(() => {
    addWindowFrameRef(id, windowFrameRef)
  }, [id, addWindowFrameRef])

  const programNavigation = programService.getNavigationHandler(id)

  return (
    <Window
      state={state}
      zIndex={zIndex}
      isFocused={isFocused}
      isResizable={isResizable}
      hideControls={hideControls}
      windowFrameRef={windowFrameRef}
      onClose={handleClose}
      onFocus={handleFocus}
      onMinimize={handleMinimize}
      onMaximize={handleMaximize}
      onStartDrag={onStartDrag}
      onStartResize={isResizable !== false ? startResizing : undefined}
      onBackNavigation={programNavigation?.canGoBack() ? programNavigation.goBack : undefined}
    >
      {memoizedContentComponent}
    </Window>
  )
})
