export interface XYCoordinate {
  x: number
  y: number
}

export type ClickPosition = XYCoordinate
export type ContextMenuPosition = XYCoordinate
export type GridPosition = XYCoordinate
export type GridCellPosition = XYCoordinate
export type WindowPosition = XYCoordinate

export interface ContainerSize {
  width: number
  height: number
}

export type ContextMenuSize = ContainerSize
export type GridContainerSize = ContainerSize
export type WindowSize = ContainerSize
