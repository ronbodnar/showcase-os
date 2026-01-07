import { forwardRef } from "react"
import { GridCell } from "./GridCell"
import { makeKey } from "@shared/utils/utils"
import { GridProps } from "../types"

export const Grid = forwardRef<HTMLDivElement, GridProps & { rows: number; cols: number }>(
  (
    {
      id,
      rows,
      cols,
      rowGap = 0,
      colGap = 0,
      iconSize,
      launchers,
      showGridLines,
      useMobileLauncher,
      isGridResponsive,
      onContextMenu,
    },
    ref,
  ) => {
    const handleContextMenu = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (typeof onContextMenu === "function") {
        onContextMenu(e)
      }
    }

    return (
      <div
        ref={ref}
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: isGridResponsive
            ? `repeat(${cols}, minmax(${iconSize}px, 1fr))`
            : `repeat(${cols}, minmax(${iconSize}px, max-content))`,
          gridTemplateRows: isGridResponsive
            ? `repeat(${rows}, minmax(${iconSize}px, 1fr))`
            : `repeat(${rows}, minmax(${iconSize}px, max-content))`,

          columnGap: colGap,
          rowGap: rowGap,

          alignItems: "center",
          justifyContent: "center",
        }}
        onContextMenu={handleContextMenu}
      >
        {Array.from({ length: rows * cols }).map((_, index) => {
          const row = Math.floor(index / cols)
          const col = index % cols
          const key = makeKey("GRID_ITEM", id, { x: col, y: row })
          const launcher = launchers?.find((l) => l.position.x === col && l.position.y === row)

          return (
            <GridCell
              key={key}
              position={{ x: col, y: row }}
              gridId={id}
              iconSize={iconSize}
              showGridLines={showGridLines ?? false}
              useMobileLauncher={useMobileLauncher}
              launcher={launcher}
            />
          )
        })}
      </div>
    )
  },
)
