import { ClickPosition, XYCoordinate, ContainerSize } from "types"

export const disableTextSelection = () => document.body.classList.add("no-select")

export const enableTextSelection = () => document.body.classList.remove("no-select")

export const clickedInside = (
  clickPosition: ClickPosition,
  containerPosition: XYCoordinate,
  containerSize: ContainerSize,
) => {
  return (
    clickPosition.x >= containerPosition.x &&
    clickPosition.x <= containerPosition.x + containerSize.width &&
    clickPosition.y >= containerPosition.y &&
    clickPosition.y <= containerPosition.y + containerSize.height
  )
}
