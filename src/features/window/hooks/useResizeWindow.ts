import { useCallback, useEffect, useRef } from "react"
import { WindowSize, WindowPosition, ClickPosition } from "types"
import { useWindowStore } from "../store/useWindowStore"
import { WindowState, WindowResizeLocation } from "../types"

export const useResizeWindow = (windowState: WindowState) => {
  const sizeRef = useRef<WindowSize | undefined>(undefined)
  const positionRef = useRef<WindowPosition | undefined>(undefined)
  const resizeEdgeRef = useRef<WindowResizeLocation | undefined>(undefined)
  const clickPositionRef = useRef<ClickPosition | undefined>(undefined)
  const windowStateRef = useRef<WindowState | undefined>(windowState)

  const moveWindow = useWindowStore((state) => state.moveWindow)
  const resizeWindow = useWindowStore((state) => state.resizeWindow)

  // Track position and size for the curent windowState, so it is available in handlePointerMove. Using windowState results in stale values.
  useEffect(() => {
    windowStateRef.current = windowState
  }, [windowState])

  const getResizedValues = useCallback((deltaX: number, deltaY: number) => {
    if (!positionRef.current || !sizeRef.current || !resizeEdgeRef.current) {
      return [
        positionRef.current?.x ?? 0,
        positionRef.current?.y ?? 0,
        sizeRef.current?.height ?? 0,
        sizeRef.current?.width ?? 0,
      ]
    }

    let { x, y } = positionRef.current
    let { width, height } = sizeRef.current

    switch (resizeEdgeRef.current) {
      case "n":
        y += deltaY
        height -= deltaY
        break

      case "e":
        width += deltaX
        break

      case "s":
        height += deltaY
        break

      case "w":
        x += deltaX
        width -= deltaX
        break

      case "ne":
        width += deltaX
        height -= deltaY
        y += deltaY
        break

      case "nw":
        width -= deltaX
        height -= deltaY
        y += deltaY
        x += deltaX
        break

      case "se":
        width += deltaX
        height += deltaY
        break

      case "sw":
        width -= deltaX
        height += deltaY
        x += deltaX
        break
    }
    return [x, y, height, width]
  }, [])

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!windowStateRef.current) {
        return
      }

      const { clientX, clientY } = e

      if (
        !(
          clientX >= 0 &&
          clientY >= 0 &&
          clientX <= window.innerWidth &&
          clientY <= window.innerHeight
        )
      ) {
        return
      }

      const deltaX = clientX - clickPositionRef.current!.x
      const deltaY = clientY - clickPositionRef.current!.y

      const [newX, newY, newHeight, newWidth] = getResizedValues(deltaX, deltaY)

      const minWidth = windowStateRef.current?.minSize?.width ?? 0
      const minHeight = windowStateRef.current?.minSize?.height ?? 0

      // Instead of blocking the entire resize when one is invalid or using clamp to force size constraints.
      // Manually track the width/height, which also allows resizing width even if height is not valid (too small/large), or vice versa.
      const isValidWidth = newWidth >= minWidth && newWidth <= window.innerWidth
      const isValidHeight = newHeight >= minHeight && newHeight <= window.innerHeight

      const newPosition = {
        x: isValidWidth ? newX : windowStateRef.current.position.x,
        y: isValidHeight ? newY : windowStateRef.current.position.y,
      }

      const newSize = {
        width: isValidWidth ? newWidth : windowStateRef.current.size.width,
        height: isValidHeight ? newHeight : windowStateRef.current.size.height,
      }

      resizeWindow(windowStateRef.current?.id, newSize)
      moveWindow(windowStateRef.current?.id, newPosition)
    },
    [getResizedValues, moveWindow, resizeWindow],
  )

  const handlePointerUp = useCallback(
    (e: PointerEvent) => {
      e.stopPropagation()

      sizeRef.current = undefined
      positionRef.current = undefined
      resizeEdgeRef.current = undefined
      clickPositionRef.current = undefined

      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    },
    [handlePointerMove],
  )

  const startResizing = useCallback(
    (e: React.PointerEvent<HTMLDivElement>, location: WindowResizeLocation) => {
      e.stopPropagation()

      if (!windowStateRef.current) {
        return
      }

      resizeEdgeRef.current = location
      sizeRef.current = windowStateRef.current.size
      positionRef.current = windowStateRef.current.position
      clickPositionRef.current = { x: e.clientX, y: e.clientY }

      window.addEventListener("pointermove", handlePointerMove)
      window.addEventListener("pointerup", handlePointerUp)
    },
    [handlePointerUp, handlePointerMove],
  )

  return { startResizing }
}
