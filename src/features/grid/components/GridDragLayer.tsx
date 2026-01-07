import { type CSSProperties } from "react"
import type { XYCoord } from "react-dnd"
import { useDragLayer } from "react-dnd"
import { GridDragLayerProps, DragItemType, DragItemTypes } from "../types"
import GridLauncher from "@features/launcher/components/GridLauncher"
import { debugMessage } from "@shared/utils/utils"

export function GridDragLayer({ size }: GridDragLayerProps) {
  const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType() as DragItemType,
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))

  function renderItem() {
    switch (itemType) {
      case DragItemTypes.LAUNCHER:
        return (
          <GridLauncher
            id={item.id}
            gridId={item.gridId}
            meta={item.meta}
            iconSize={item.iconSize}
            isDragPreview={true}
          />
        )

      default:
        return null
    }
  }

  if (!isDragging) {
    return null
  }

  return (
    <div style={getItemStyles(itemType, initialOffset, currentOffset, size)}>{renderItem()}</div>
  )
}

function getItemStyles(
  itemType: DragItemType,
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
  size: number,
): CSSProperties {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    }
  }

  const { x, y } = currentOffset
  if (x + size > window.innerWidth || y + size > window.innerHeight) {
    debugMessage("DragLayer outside of window")
  }
  const transform = `translate(${x}px, ${y}px)`
  return {
    top: 0,
    left: 0,
    zIndex: itemType === DragItemTypes.LAUNCHER ? 100 : 20,
    position: "fixed",
    pointerEvents: "none",
    transform,
    WebkitTransform: transform,
    width: size,
    height: size,
  }
}
