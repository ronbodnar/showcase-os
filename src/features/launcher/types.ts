import { GridId } from "@features/grid/types"
import { SystemAction } from "@features/os/actions/systemRegistry"
import { ProgramId } from "@features/program/types"
import { IconName } from "@features/theme/types"
import { XYCoordinate } from "types"
import { LauncherAction } from "./actions/launcherActions"
import { LAUNCHER_METADATA } from "./metadata"

export type LauncherId = (typeof LAUNCHER_METADATA)[number]["id"] | ProgramId

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

export type LauncherTarget = LauncherActionTarget | LauncherProgramTarget

export interface LauncherMetadata {
  target: LauncherTarget

  id?: string
  label?: string
  icon?: IconName
  description?: string
  disabled?: boolean
  disabledText?: string
  draggable?: boolean
}

export interface LauncherProps {
  id: string
  iconSize: number
  meta: LauncherMetadata
  className?: string
  gridId?: GridId
  drawLabel?: boolean
  isDragPreview?: boolean
}

export interface GridLauncherState {
  id: string
  meta: LauncherMetadata
  gridId: GridId
  position: XYCoordinate
  displayIds: string[]
  isPinned?: boolean
}
