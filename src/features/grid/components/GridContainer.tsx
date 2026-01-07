import { memo, useEffect, useRef } from "react"
import { gridService } from "@features/grid/services/gridService"
import { useGridStore } from "../store/useGridStore"
import { GridProps } from "../types"
import { Grid } from "./Grid"
import { windowService } from "@features/window/services/windowService"
import { GridContainerSize } from "types"

export const GridContainer = memo(function GridContainer(props: GridProps) {
  const {
    id,
    numRows,
    numCols,
    iconSize,
    isGridResponsive,
    launchers,
    layoutDirection = "vertical",
  } = props
  const containerRef = useRef<HTMLDivElement>(null)

  const grid = useGridStore((s) => s.getGridById(id))
  const ensureGrid = useGridStore((s) => s.ensureGrid)
  const setRows = useGridStore((s) => s.setRows)
  const setCols = useGridStore((s) => s.setCols)
  const setSize = useGridStore((s) => s.setSize)

  const rows = numRows ?? grid?.rows ?? 0
  const cols = numCols ?? grid?.cols ?? 0

  const lastSizeRef = useRef<GridContainerSize>(grid?.size ?? { width: 0, height: 0 })

  useEffect(() => {
    const container = containerRef.current
    const rect = container?.getBoundingClientRect()

    ensureGrid({
      id,
      rows,
      cols,
      size: {
        width: container?.clientWidth || 0,
        height: container?.clientHeight || 0,
      },
      position: {
        x: rect?.left || 0,
        y: rect?.top || 0,
      },
      layoutDirection,
    })
  }, [id, rows, cols, layoutDirection, ensureGrid])

  useEffect(() => {
    if (!isGridResponsive || !containerRef.current) return

    let timeout: NodeJS.Timeout | undefined

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect

        if (timeout) {
          clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
          setSize(id, { width, height })
          windowService.reconcileWindowPositions(lastSizeRef.current)
          lastSizeRef.current = { width, height }
        }, 250)

        let newRows: number
        let newCols: number

        if (layoutDirection === "horizontal") {
          // Mobile: columns grow left-to-right
          newCols = Math.floor(width / (iconSize + 40)) || 1
          newRows = Math.ceil((launchers.length || 1) / newCols)
        } else {
          // Desktop: rows grow top-to-bottom
          newRows = Math.floor(height / (iconSize + 40)) || 1
          newCols = Math.floor(width / (iconSize + 40)) || 1
        }

        gridService.reconcileLauncherPositions(id, newRows, newCols)

        setRows(id, newRows)
        setCols(id, newCols)
      }
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [id, grid, iconSize, isGridResponsive, layoutDirection, launchers, setRows, setCols, setSize])

  return <Grid {...props} ref={containerRef} rows={rows} cols={cols} />
})
