import { useCallback, useEffect, useRef } from "react"
import { useWindowStore } from "../store/useWindowStore"
import { WindowPosition, XYCoordinate } from "types"
import { clamp } from "@shared/utils/utils"
import { useGridStore } from "@features/grid/store/useGridStore"

export const useDragWindow = (id: string, currentPosition: WindowPosition) => {
  const moveWindow = useWindowStore((state) => state.moveWindow)
  const panelHeight = useGridStore((state) => state.grids["home"]?.size.height ?? 0)

  const startMouse = useRef<XYCoordinate | null>(null)
  const startWindow = useRef<WindowPosition | null>(null)
  const latestPosition = useRef(currentPosition)

  useEffect(() => {
    latestPosition.current = currentPosition
  }, [currentPosition])

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!startMouse.current || !startWindow.current) return

      const deltaX = e.clientX - startMouse.current.x
      const deltaY = e.clientY - startMouse.current.y

      moveWindow(id, {
        x: startWindow.current.x + deltaX,
        y: clamp(startWindow.current.y + deltaY, 0, panelHeight - 20),
      })
    },
    [id, moveWindow, panelHeight],
  )

  const handlePointerUp = useCallback(
    (e: PointerEvent) => {
      e.stopPropagation()

      document.body.style.cursor = "auto"

      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    },
    [handlePointerMove],
  )

  const startDragging = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.stopPropagation()

      document.body.style.cursor = "move"

      startMouse.current = { x: e.clientX, y: e.clientY }
      startWindow.current = { ...latestPosition.current }

      window.addEventListener("pointermove", handlePointerMove)
      window.addEventListener("pointerup", handlePointerUp)
    },
    [handlePointerMove, handlePointerUp],
  )

  return { startDragging }
}
