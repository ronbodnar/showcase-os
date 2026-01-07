import {
  ConnectDragPreview,
  ConnectDragSource,
  ConnectDropTarget,
  useDrag,
  useDrop,
} from "react-dnd"
import { useCallback } from "react"
import { useDesktopStore } from "@features/environments/desktop/store/useDesktopStore"
import { DragItemType, DragItemTypes, GridId } from "@features/grid/types"
import { useLauncherStore } from "@features/launcher/store/useLauncherStore"
import { debugMessage, isValidObject } from "@shared/utils/utils"
import { GridCellPosition } from "types"

type DragDropOptions<ItemType> = {
  type: "drag" | "drop"
  itemType: DragItemType
  item: ItemType
  canDrag?: boolean
  canDrop?: boolean
}

export const useDragDrop = <ItemType>({
  type,
  itemType,
  item,
  canDrag,
}: DragDropOptions<ItemType>) => {
  const moveOrSwapLauncher = useLauncherStore((state) => state.moveLauncher)
  const clearSelectedLaunchers = useDesktopStore((state) => state.clearSelectedLaunchers)
  const selectLauncher = useDesktopStore((state) => state.selectLauncher)

  const handleDrop = (itemType: DragItemType, droppedItem: unknown) => {
    clearSelectedLaunchers()

    if (!isValidObject(droppedItem)) {
      debugMessage("droppedItem is not a valid object", droppedItem)
      return
    }

    switch (itemType) {
      case DragItemTypes.LAUNCHER: {
        if (!isValidObject(item) || !("position" in item) || !("gridId" in item)) {
          debugMessage("target item is not a valid object", item)
          return
        }

        if (
          !isValidObject(droppedItem) ||
          !("id" in droppedItem) ||
          !("gridId" in droppedItem) ||
          !("position" in droppedItem) ||
          !("meta" in droppedItem) ||
          !("iconSize" in droppedItem)
        ) {
          debugMessage("droppedItem is not a valid object", droppedItem)
          return
        }

        const sourcePosition = droppedItem.position as GridCellPosition
        const targetPosition = item.position as GridCellPosition

        if (droppedItem.gridId !== item.gridId) {
          debugMessage("Dropped item is not in the same grid as the target", droppedItem, item)
          return
        }

        selectLauncher(droppedItem.id as string)
        moveOrSwapLauncher(droppedItem.gridId as GridId, sourcePosition, targetPosition)
        break
      }
    }
  }

  const handleCanDrop = (_itemType: DragItemType, _item: unknown) => {
    return true
  }

  // Dragging behavior
  const [{ isDragging }, drag, preview] = useDrag(
    {
      type: itemType,
      item: item,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      canDrag: canDrag,
    },
    [item, itemType, canDrag],
  )

  const dragRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) drag(node)
    },
    [drag],
  )

  // Dropping behavior
  const [, drop] = useDrop(
    () => ({
      accept: itemType,
      drop: (item) => handleDrop(itemType, item),
      canDrop: (item) => handleCanDrop(itemType, item),
    }),
    [item, itemType],
  )

  const dropRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) drop(node)
    },
    [drop],
  )

  type props = {
    drop?: ConnectDropTarget
    dropRef?: (node: HTMLDivElement | null) => void
    drag?: ConnectDragSource
    dragRef?: (node: HTMLDivElement | null) => void
    preview?: ConnectDragPreview
    isDragging?: boolean
  }

  return (
    type === "drop"
      ? { dropRef }
      : {
          isDragging,
          dragRef,
          preview,
        }
  ) as props
}
