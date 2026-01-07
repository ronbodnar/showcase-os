import { v4 as uuidv4 } from "uuid"
import { GridId } from "@features/grid/types"
import { getProgramMeta } from "@features/program/registry"
import { ProgramMetadata } from "@features/program/types"
import { GridCellPosition } from "types"
import { getLauncherMeta } from "../registry"
import { LauncherStore } from "../store/useLauncherStore"
import {
  LauncherTarget,
  isLauncherProgramTarget,
  LauncherMetadata,
  isLauncherActionTarget,
  GridLauncherState,
  LauncherId,
} from "../types"

export function getProgramMetaFromTarget(target: LauncherTarget): ProgramMetadata | undefined {
  if (isLauncherProgramTarget(target)) {
    return getProgramMeta(target.programId)
  }
  return undefined
}

export function isExternalLauncher(meta: LauncherMetadata): boolean {
  return isLauncherActionTarget(meta.target) && meta.target.action === "openUrl"
}

export function sameProgramTarget(a: LauncherTarget, b: LauncherTarget): boolean {
  return isLauncherProgramTarget(a) && isLauncherProgramTarget(b) && a.programId === b.programId
}

export function sameActionTarget(a: LauncherTarget, b: LauncherTarget): boolean {
  return (
    isLauncherActionTarget(a) &&
    isLauncherActionTarget(b) &&
    a.action === b.action &&
    (a.args === b.args || JSON.stringify(a.args) === JSON.stringify(b.args))
  )
}

const syncById = (launchers: GridLauncherState[]): Record<string, GridLauncherState> =>
  launchers.reduce(
    (acc, l) => {
      acc[l.id] = l
      return acc
    },
    {} as Record<string, GridLauncherState>,
  )

export function updateGridAndId(
  stateStore: LauncherStore,
  gridId: GridId,
  launchers: GridLauncherState[],
) {
  const allLaunchers = Object.values({
    ...stateStore.launchersByGrid,
    [gridId]: launchers,
  }).flat()
  return {
    launchersByGrid: { ...stateStore.launchersByGrid, [gridId]: launchers },
    launchersById: syncById(allLaunchers),
  }
}

export function getDefaultLauncherState(
  gridId: GridId,
  initialLauncherConfigs: { id: LauncherId; position: GridCellPosition }[],
) {
  return initialLauncherConfigs.map(({ id, position }) => ({
    id: uuidv4(),
    position,
    gridId,
    meta: getLauncherMeta(id),
    displayIds: [],
    isPinned: true,
  }))
}
