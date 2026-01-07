import { GridId } from "@features/grid/types"
import { GridCellPosition } from "types"

export function debugMessage(message: unknown, ...optionalParams: unknown[]) {
  if (process.env.NODE_ENV === "development") {
    console.log(message, ...optionalParams)
  }
}

export function clamp(val: number, min: number, max: number) {
  return val > max ? max : val < min ? min : val
}

export function isValidObject(object: unknown) {
  return typeof object === "object" && object != null
}

export const makeKey = (
  type: "GRID_ITEM" | "LAUNCHER",
  gridId: GridId,
  position: GridCellPosition,
) => `${type}_${gridId}-${position.x}-${position.y}`

export const syncById = <IdType extends string | number, T extends { id: IdType }>(
  state: T[],
): Record<IdType, T> =>
  state.reduce(
    (acc, l) => {
      acc[l.id] = l
      return acc
    },
    {} as Record<IdType, T>,
  )
