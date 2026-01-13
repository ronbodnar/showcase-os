import { useOverlayPosition } from "@core/hooks/useOverlayPosition"
import { useLayoutEffect, useMemo, useState } from "react"
import { XYCoordinate, ContainerSize } from "types"

export interface TooltipProps {
  text: string
  position?: XYCoordinate
}

export function Tooltip(props: TooltipProps) {
  const [size, setSize] = useState<ContainerSize | undefined>(undefined)

  const offset = useMemo(
    () => (size ? { x: (size.width / 2) * -1, y: (size.height + 5) * -1 } : { x: 0, y: 0 }),
    [size],
  )

  const { text, position } = props
  const { ref, coords } = useOverlayPosition({
    position,
    offset,
    constraint: "clamp",
  })

  useLayoutEffect(() => {
    const el = ref.current
    if (!text || !el) {
      return
    }

    setSize({ width: el.clientWidth, height: el.clientHeight })
  }, [ref, text])

  return (
    <div
      ref={ref}
      className="fixed z-999 text-sm px-5 py-3 rounded-md shadow-lg pointer-events-none whitespace-nowrap text-stone-200 bg-accent/90"
      style={{ left: coords.x, top: coords.y }}
    >
      {text}
    </div>
  )
}
