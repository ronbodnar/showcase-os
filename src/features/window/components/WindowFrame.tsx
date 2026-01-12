import { memo, useMemo } from "react"
import { WINDOW_RESIZE_LOCATIONS, WindowResizeLocation } from "../types"
import { WindowResizeHotspot } from "./WindowResizeHotspot"
import { WindowTitleBar } from "./WindowTitleBar"

interface WindowFrameProps {
  ref?: React.RefObject<HTMLDivElement | null>
  title: string
  isFocused?: boolean
  isMinimized: boolean
  isMaximized?: boolean
  isResizable?: boolean
  hideControls?: boolean
  children: React.ReactNode
  onStartDrag?: (e: React.PointerEvent<HTMLDivElement>) => void
  onStartResize?: (e: React.PointerEvent<HTMLDivElement>, location: WindowResizeLocation) => void
  onClose?: (e: React.MouseEvent) => void
  onFocus?: (e: React.PointerEvent<HTMLDivElement>) => void
  onMinimize?: (e: React.MouseEvent) => void
  onMaximize?: (e: React.MouseEvent) => void
  onContextMenu?: (e: React.MouseEvent) => void
  onBackNavigation?: (() => void) | undefined
}

export const WindowFrame = memo(function WindowFrame({
  ref,
  title,
  isFocused = false,
  isMinimized = false,
  isMaximized = false,
  isResizable = true,
  hideControls = false,
  children,
  onStartDrag,
  onStartResize,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onContextMenu,
  onBackNavigation,
}: WindowFrameProps) {
  const resizeHotspots = useMemo(
    () =>
      isResizable
        ? WINDOW_RESIZE_LOCATIONS.map((location) => (
            <WindowResizeHotspot
              key={`hotspot_${location}`}
              location={location}
              onClick={(e) => onStartResize?.(e, location)}
            />
          ))
        : [],
    [onStartResize, isResizable],
  )

  return (
    <div
      ref={ref}
      className={`
        flex flex-col justify-start w-full h-full rounded-t-lg border border-border
        ${isFocused ? "shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.35),0_6px_18px_rgba(0,0,0,0.25)]" : ""}
        ${isMinimized ? "pointer-events-none" : ""}
      `}
      onPointerDown={onFocus}
      onContextMenu={onContextMenu}
    >
      {isResizable !== false && resizeHotspots}

      {(title || !hideControls) && (
        <WindowTitleBar
          titleText={title}
          isFocused={isFocused}
          isMaximized={isMaximized}
          hideControls={hideControls}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onPointerDown={onStartDrag}
          onBackNavigation={onBackNavigation}
        />
      )}

      <div className="@container w-full h-full overflow-y-auto flex flex-col bg-surface">
        {children}
      </div>
    </div>
  )
})
