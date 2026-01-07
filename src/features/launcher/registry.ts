import { getAllProgramMetadata } from "@features/program/registry"
import { LAUNCHER_METADATA } from "./metadata"
import { LauncherMetadata, LauncherId } from "./types"

let launcherMap: Record<LauncherId, LauncherMetadata> | undefined = undefined

function buildProgramLaunchers() {
  // First build a map of launchers from the program registry as a baseline
  const programLauncherMap: Record<LauncherId, LauncherMetadata> = Object.fromEntries(
    getAllProgramMetadata().map((p) => [
      p.id,
      {
        id: p.id,
        label: p.name,
        icon: p.icon,
        description: p.details?.description?.short,
        target: { type: "program", programId: p.id },
        disabled: p.disabled,
        disabledText: p.disabledText,
      },
    ]),
  ) as Record<LauncherId, LauncherMetadata>

  // Apply custom launchers or override properties of existing program launchers
  const overrideLauncherMap: Record<LauncherId, LauncherMetadata> = Object.fromEntries(
    LAUNCHER_METADATA.map((l) => [l.id, l as LauncherMetadata]),
  ) as Record<LauncherId, LauncherMetadata>

  const mergedMap = { ...programLauncherMap } as Record<LauncherId, LauncherMetadata>

  // Merge safely instead of overwriting so existing properties persist
  for (const [id, launcher] of Object.entries(overrideLauncherMap)) {
    if (id in mergedMap) {
      mergedMap[id as LauncherId] = {
        ...mergedMap[id as LauncherId],
        ...launcher,
        target: {
          ...mergedMap[id as LauncherId].target,
          ...launcher.target,
        },
      }
      continue
    }

    mergedMap[id as LauncherId] = launcher
  }

  return mergedMap
}

export function getLauncherMeta(id: LauncherId): LauncherMetadata {
  if (!launcherMap) {
    launcherMap = buildProgramLaunchers()
  }
  return launcherMap[id]
}
