import { GridCellPosition, GridContainerSize, GridPosition } from "../../types"
import { GridLauncherState } from "../../features/launcher/types"

export type GridId = "home" | "panel"

export interface GridState {
  id: string
  rows: number
  cols: number
  size: GridContainerSize
  position: GridPosition
  layoutDirection: "vertical" | "horizontal"
}

/* Have to decide how to use Grid's within windows since there can possibly be multiple grids in a window. 
 I havent ran into problems doing it so far but what if we just have it create the store and all windows share the same store
  since they would not be draggable anyway? */
export interface GridProps {
  id: GridId
  iconSize: number
  launchers: GridLauncherState[]

  /*
   * If you want a fixed grid that does not resize with the container, set the rows and cols.
   * If you set rows but not cols, or vice versa, the empty value will be calculated automatically based on launchers.
   *
   * If you do not set both rows and cols, you must set isGridResponsive to true or the grid will not render.
   */
  numRows?: number
  numCols?: number

  rowGap?: number
  colGap?: number

  useMobileLauncher?: boolean
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

/* These should be moved with other dnd functionality */
export interface GridDragLayerProps {
  size: number
}

export const DragItemTypes = {
  LAUNCHER: "launcher",
  WINDOW: "window",
} as const

export type DragItemType = (typeof DragItemTypes)[keyof typeof DragItemTypes]
