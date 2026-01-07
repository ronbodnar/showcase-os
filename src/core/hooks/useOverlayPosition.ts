import { useGridStore } from "@features/grid/store/useGridStore"
import { clamp, debugMessage } from "@shared/utils/utils"
import { useRef, useState, useLayoutEffect, useCallback } from "react"
import { XYCoordinate } from "types"

interface UseOverlayPositionProps {
  position: XYCoordinate | undefined
  offset?: Partial<XYCoordinate>
  constraint?: "viewport" | "clamp" | "none"
}

export const useOverlayPosition = ({
  position,
  offset,
  constraint = "none",
}: UseOverlayPositionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState<XYCoordinate>(position ?? { x: -9999, y: -9999 })
  const homeSize = useGridStore((state) => state.grids["home"]?.size)

  const recalculatePosition = useCallback(() => {
    if (!ref.current || !position) {
      return
    }

    const w = ref.current.clientWidth
    const h = ref.current.clientHeight

    let top = position.y
    let left = position.x

    const offsetX = offset?.x ?? -(w / 2)
    const offsetY = offset?.y ?? -(h + 5)

    const maxLeft = (homeSize?.width ?? window.innerWidth) - w
    const maxTop = (homeSize?.height ?? window.innerHeight) - h

    switch (constraint) {
      case "none": {
        break
      }

      case "viewport": {
        if (left < 1) {
          left = 1
        } else if (left >= maxLeft) {
          left = position.x - w
        }

        if (top < 1) {
          top = 1
        } else if (top >= maxTop) {
          top = position.y - h
        }
        break
      }

      case "clamp": {
        top = clamp(position.y, 1, maxTop)
        left = clamp(position.x + offsetX, 1, maxLeft)

        // Apply offset only if there's room; skip if clamped to bottom
        if (top !== maxTop) {
          top = top + offsetY
        }
        break
      }

      default: {
        debugMessage("Unsupported constraint in useOverlayPosition: ", constraint)
      }
    }

    setCoords((prev) => {
      if (prev.x === left && prev.y === top) return prev
      return { x: left, y: top }
    })
  }, [position, constraint, homeSize, offset])

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) {
      return
    }

    recalculatePosition()

    const resizeObserver = new ResizeObserver(() => recalculatePosition())
    resizeObserver.observe(node)
    return () => resizeObserver.disconnect()
  }, [ref, recalculatePosition])

  return { ref, coords }
}
