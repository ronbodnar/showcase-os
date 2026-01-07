import { useMemo } from "react"
import { getLauncherMeta } from "@features/launcher/registry"
import { LauncherMetadata } from "@features/launcher/types"
import { StartMenuGrid } from "./StartMenuGrid"
import { StartMenuLauncher } from "./types"

export function Sidebar({
  onLauncherHovered,
}: {
  onLauncherHovered: (launcher: StartMenuLauncher | undefined) => void
}) {
  const programLaunchers: LauncherMetadata[] = useMemo(
    () => [
      getLauncherMeta("software_center"),
      getLauncherMeta("system_settings"),
      getLauncherMeta("terminal"),
      {
        ...getLauncherMeta("visual_studio_code"),
        disabled: true,
      },
    ],
    [],
  )

  const systemActionLaunchers: LauncherMetadata[] = useMemo(
    () => [getLauncherMeta("lock_screen"), getLauncherMeta("shutdown")],
    [],
  )

  return (
    <div className="m-4 flex flex-col justify-between items-center bg-surface rounded-md">
      <StartMenuGrid
        id="startMenu"
        launchers={programLaunchers}
        iconSize={38}
        onLauncherHovered={onLauncherHovered}
      />
      <StartMenuGrid
        id="startMenu"
        launchers={systemActionLaunchers}
        iconSize={38}
        onLauncherHovered={onLauncherHovered}
      />
    </div>
  )
}
