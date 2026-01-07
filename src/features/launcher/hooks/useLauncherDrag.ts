import { useEffect } from "react"
import { getEmptyImage } from "react-dnd-html5-backend"
import { useDragDrop } from "@core/hooks/useDragDrop"
import { GridId, DragItemTypes } from "@features/grid/types"
import { GridCellPosition } from "types"
import { useLauncherStore } from "../store/useLauncherStore"
import { LauncherProps, LauncherMetadata } from "../types"

export const useLauncherDrag = ({ id, meta, gridId, iconSize, isDragPreview }: LauncherProps) => {
  const state = useLauncherStore((state) => (id ? state.launchersById[id] : undefined))

  const { draggable } = meta ?? {}
  const { isDragging, dragRef, preview } = useDragDrop<{
    id: string
    gridId: GridId | undefined
    position: GridCellPosition | undefined
    meta: LauncherMetadata
    iconSize: number
  }>({
    type: "drag",
    item: { id, gridId, position: state?.position, meta, iconSize },
    itemType: DragItemTypes.LAUNCHER,
    canDrag: draggable !== false,
  })

  useEffect(() => {
    if (isDragPreview || !preview) return
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview, isDragPreview])

  return { isDragging, dragRef }
}
