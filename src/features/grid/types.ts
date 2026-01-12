import { GridCellPosition, GridContainerSize, GridPosition } from "../../types"
import { GridLauncherState } from "../../features/launcher/types"

/** Supported grid locations; 'panel' usually refers to the taskbar/dock area */
export type GridId = "home" | "panel"

export interface GridState {
  id: string
  rows: number
  cols: number
  size: GridContainerSize
  position: GridPosition
  layoutDirection: "vertical" | "horizontal"
}

export interface GridProps {
  id: GridId
  iconSize: number
  launchers: GridLauncherState[]

  /** Manual overrides for grid dimensions. If omitted, calculated via launchers or container size. */
  numRows?: number
  numCols?: number

  rowGap?: number
  colGap?: number

  /** Swaps launcher interaction/visuals for touch-friendly targets */
  useMobileLauncher?: boolean
  /** Required if numRows/numCols are not explicitly defined to enable auto-calculation */
  isGridResponsive?: boolean
  showGridLines?: boolean

  layoutDirection?: "vertical" | "horizontal"
  onContextMenu?: (e: React.MouseEvent) => void
}

export interface GridCellProps {
  gridId: GridId
  position: GridCellPosition
  iconSize: number
  showGridLines: boolean
  useMobileLauncher?: boolean
  launcher?: GridLauncherState
}

export interface GridDragLayerProps {
  size: number
}

export const DragItemTypes = {
  LAUNCHER: "launcher",
  WINDOW: "window",
} as const

export type DragItemType = (typeof DragItemTypes)[keyof typeof DragItemTypes]
