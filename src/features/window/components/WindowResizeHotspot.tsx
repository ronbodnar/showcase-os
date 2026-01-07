import { memo } from "react"
import { WindowResizeProps } from "../types"

const base = "absolute z-[1000] bg-transparent"
const positions: Record<string, string> = {
  n: `${base} top-0 left-0 w-full h-[5px] cursor-n-resize`,
  s: `${base} bottom-0 left-0 w-full h-[5px] cursor-s-resize`,
  e: `${base} top-0 right-0 w-[5px] h-full cursor-e-resize`,
  w: `${base} top-0 left-0 w-[5px] h-full cursor-w-resize`,
  ne: `${base} top-0 right-0 w-[5px] h-[5px] cursor-ne-resize`,
  nw: `${base} top-0 left-0 w-[5px] h-[5px] cursor-nw-resize`,
  se: `${base} bottom-0 right-0 w-[5px] h-[5px] cursor-se-resize`,
  sw: `${base} bottom-0 left-0 w-[5px] h-[5px] cursor-sw-resize`,
}

export const WindowResizeHotspot = memo(function WindowResizeHotspot({
  location,
  onClick,
}: Omit<WindowResizeProps, "windowSize">) {
  return <div className={positions[location]} onPointerDown={onClick} />
})
