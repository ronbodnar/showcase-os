import { GridId } from "@features/grid/types"
import { GridCellPosition } from "types"
import { LauncherId } from "./types"

export const DEFAULT_LAUNCHER_CONFIGS: Record<
  GridId,
  { id: LauncherId; position: GridCellPosition }[]
> = {
  home: [
    {
      id: "software_center",
      position: { x: 0, y: 0 },
    },
    {
      id: "browser",
      position: { x: 0, y: 1 },
    },
    {
      id: "system_info",
      position: { x: 0, y: 2 },
    },
    {
      id: "linkedin",
      position: { x: 0, y: 3 },
    },
    {
      id: "github",
      position: { x: 0, y: 4 },
    },
  ],
  panel: [
    {
      id: "start_menu",
      position: { x: 0, y: 0 },
    },
  ],
}
