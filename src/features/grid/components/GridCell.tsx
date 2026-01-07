import { memo } from "react"
import PanelLauncher from "@features/launcher/components/PanelLauncher"
import GridLauncher from "@features/launcher/components/GridLauncher"
import MobileLauncher from "@features/launcher/components/MobileLauncher"
import { useDragDrop } from "@core/hooks/useDragDrop"
import { makeKey } from "@shared/utils/utils"
import { GridCellPosition } from "types"
import { GridCellProps, DragItemTypes } from "../types"

export const GridCell = memo(function GridCell({
  position,
  launcher,
  gridId,
  iconSize,
  useMobileLauncher,
  showGridLines,
}: GridCellProps) {
  const { dropRef } = useDragDrop<{ gridId: string; position: GridCellPosition }>({
    type: "drop",
    item: { gridId, position },
    itemType: DragItemTypes.LAUNCHER,
  })

  const border = showGridLines ? "border border-shell" : ""

  return (
    <div
      ref={dropRef}
      role="gridCell"
      draggable={false}
      onDragStart={(e) => (launcher ? {} : e.preventDefault())}
      className={`h-full w-full ${border}`}
    >
      {launcher &&
        (gridId === "panel" ? (
          <PanelLauncher
            key={makeKey("LAUNCHER", gridId, position)}
            id={launcher.id}
            gridId={gridId}
            iconSize={iconSize}
            meta={launcher.meta}
          />
        ) : useMobileLauncher ? (
          <MobileLauncher
            key={makeKey("LAUNCHER", gridId, position)}
            id={launcher.id}
            gridId={gridId}
            iconSize={iconSize}
            meta={launcher.meta}
          />
        ) : (
          <GridLauncher
            key={makeKey("LAUNCHER", gridId, position)}
            id={launcher.id}
            gridId={gridId}
            iconSize={iconSize}
            meta={launcher.meta}
          />
        ))}
    </div>
  )
})
