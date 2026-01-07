import React, { memo, useEffect } from "react"
import { useCompositeObserver } from "@core/hooks/useCompositeObserver"
import { useCompositeRenderLoop } from "@core/hooks/useCompositeRenderLoop"
import { useOverlayPosition } from "@core/hooks/useOverlayPosition"
import { overlayService } from "@core/services/overlayService"
import { windowService } from "@features/window/services/windowService"
import { useWindowFrameRefs } from "@features/window/store/useWindowRefs"
import { XYCoordinate } from "types"
import { WindowComposite } from "./WindowComposite"

export interface WindowCompositorProps {
  windowIds: string[]
  position: XYCoordinate
}

const COMPOSITE_SIZE = { width: 200, height: 100 }
const COMPOSITE_FRAME_SIZE = { width: 225, height: 150 }

export const WindowCompositor = memo(function WindowCompositor(props: WindowCompositorProps) {
  const { position, windowIds } = props

  const { ref, coords } = useOverlayPosition({
    position,
    constraint: "clamp",
  })

  const windowFrameRefs = useWindowFrameRefs((state) => state.windowFrameRefs)

  const { composites } = useCompositeObserver({ windowIds, windowFrameRefs })

  useCompositeRenderLoop({
    renderSize: COMPOSITE_SIZE,
    composites,
    compositeSourceRefs: windowFrameRefs,
  })

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const el = ref.current
      if (!el) {
        return
      }
      const { x, y, width, height } = el.getBoundingClientRect()
      const { clientX: mouseX, clientY: mouseY } = e

      const deltaX = mouseX - (x + width / 2)
      const deltaY = mouseY - (y + height / 2)

      // The buffer distance from the element before closing the preview.
      const buffer = 50
      const bounds = {
        x: width / 2 + buffer,
        y: height / 2 + buffer,
      }

      if (Math.abs(deltaX) > bounds.x || Math.abs(deltaY) > bounds.y) {
        overlayService.hideOverlay()
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [ref])

  return (
    <div
      ref={ref}
      className={`fixed z-9999 flex`}
      style={{
        top: coords.y,
        left: coords.x,
      }}
    >
      {windowIds.map((windowId) => {
        const ref = windowFrameRefs[windowId]
        const window = windowService.getWindow(windowId)

        if (!ref || !window) return null

        return (
          <WindowComposite
            key={windowId}
            frameSize={COMPOSITE_FRAME_SIZE}
            compositeSize={COMPOSITE_SIZE}
            title={window?.title}
            onClose={(e: React.MouseEvent) => {
              e.stopPropagation()

              windowService.closeWindow(windowId)

              if (windowIds.length === 1) {
                overlayService.hideOverlay()
              }
            }}
            onClick={() => {
              windowService.focusWindow(windowId)
              overlayService.hideOverlay()
            }}
            setRef={(el) => {
              composites.current[windowId] = {
                ...(composites.current[windowId] ?? {}),
                ref: el,
              }
            }}
          />
        )
      })}
    </div>
  )
})
