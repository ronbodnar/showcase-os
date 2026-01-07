import { WindowPosition, WindowSize } from "types"

export type WindowState = {
  id: string
  title: string
  processId: number

  position: WindowPosition
  size: WindowSize

  previousSize: WindowSize
  previousPosition: WindowPosition

  minSize?: WindowSize
  maxSize?: WindowSize

  isMinimized?: boolean
  isMaximized?: boolean

  resizeEdge?: WindowResizeLocation

  hiddenByDesktopMode?: boolean
}

export type WindowResizeProps = {
  location: WindowResizeLocation
  windowSize: WindowSize
  onClick: (e: React.PointerEvent<HTMLDivElement>) => void
}

export const WINDOW_RESIZE_LOCATIONS = ["n", "e", "s", "w", "ne", "nw", "se", "sw"] as const

export type WindowResizeLocation = (typeof WINDOW_RESIZE_LOCATIONS)[number]
