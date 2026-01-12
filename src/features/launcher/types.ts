import { GridId } from "@features/grid/types"
import { SystemAction } from "@features/os/actions/systemRegistry"
import { ProgramId } from "@features/program/types"
import { IconName } from "@features/theme/types"
import { XYCoordinate } from "types"
import { LauncherAction } from "./actions/launcherActions"
import { config } from "@config/config"

export type LauncherId = (typeof config.launchers.metadata)[number]["id"] | ProgramId

/**
 * Defines what happens when a launcher is triggered.
 * Targets either a system-level action or a specific application.
 */
export interface LauncherActionTarget {
  type: "action"
  action: LauncherAction | SystemAction
  args?: Record<string, unknown>
}

export interface LauncherProgramTarget {
  type: "program"
  programId: ProgramId
  args?: Record<string, unknown>
}

export type LauncherTarget = LauncherActionTarget | LauncherProgramTarget

export function isLauncherProgramTarget(
  target: LauncherTarget | undefined,
): target is LauncherProgramTarget {
  return target?.type === "program"
}

export function isLauncherActionTarget(
  target: LauncherTarget | undefined,
): target is LauncherActionTarget {
  return target?.type === "action"
}

export interface LauncherMetadata {
  target: LauncherTarget
  id?: string
  label?: string
  icon?: IconName
  description?: string
  disabled?: boolean
  disabledText?: string
  /** Certain launchers like the Start Menu should be fixed in place and not draggable. */
  draggable?: boolean
}

/** UI props for rendering a launcher icon within a grid or bar */
export interface LauncherProps {
  id: string
  iconSize: number
  meta: LauncherMetadata
  className?: string
  gridId?: GridId
  drawLabel?: boolean
  isDragPreview?: boolean
}

/** Persistent state for a launcher's placement and visibility on a specific grid */
export interface GridLauncherState {
  id: string
  meta: LauncherMetadata
  gridId: GridId
  position: XYCoordinate
  /** Tracking window IDs for multiple instances of the same launcher */
  displayIds: string[]
  isPinned?: boolean
}
