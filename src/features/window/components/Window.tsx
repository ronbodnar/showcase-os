import { memo, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { WindowFrame } from "./WindowFrame"
import { WindowResizeLocation, WindowState } from "../types"
import { debugMessage } from "@shared/utils/utils"

export type WindowProps = {
  state: WindowState
  zIndex: number
  windowFrameRef: React.RefObject<HTMLDivElement | null>
  children: React.ReactNode
  isFocused?: boolean
  isResizable?: boolean
  hideControls?: boolean
  onClose?: (e: React.MouseEvent) => void
  onFocus?: (e: React.PointerEvent<HTMLDivElement>) => void
  onMinimize?: (e: React.MouseEvent) => void
  onMaximize?: (e: React.MouseEvent) => void
  onStartDrag?: (e: React.PointerEvent<HTMLDivElement>) => void
  onStartResize?: (e: React.PointerEvent<HTMLDivElement>, location: WindowResizeLocation) => void
  onBackNavigation?: (() => void) | undefined
}

export const Window = memo(function Window({
  state,
  zIndex,
  isFocused,
  isResizable,
  hideControls,
  windowFrameRef,
  children,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onStartDrag,
  onStartResize,
  onBackNavigation,
}: WindowProps) {
  const { id, size, position, isMinimized, isMaximized, hiddenByDesktopMode, title } = state

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  debugMessage("Rendering Window:", title)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isMinimized || hiddenByDesktopMode ? 0 : 1,
          scale: isMinimized || hiddenByDesktopMode ? 0.8 : 1,
        }}
        transition={{ duration: 0.1 }}
        style={{
          position: "absolute",
          zIndex,
          top: position.y,
          left: position.x,
          width: size.width,
          height: size.height,
          pointerEvents: isMinimized || hiddenByDesktopMode ? "none" : "auto",
        }}
      >
        <WindowFrame
          ref={windowFrameRef}
          title={title}
          isFocused={isFocused}
          isMinimized={!!(isMinimized || hiddenByDesktopMode)}
          isMaximized={isMaximized}
          isResizable={isResizable}
          hideControls={hideControls}
          onStartDrag={onStartDrag}
          onStartResize={onStartResize}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onFocus={onFocus}
          onContextMenu={handleContextMenu}
          onBackNavigation={onBackNavigation}
        >
          {children}
        </WindowFrame>
      </motion.div>
    </AnimatePresence>
  )
})
