import { useSettingsStore } from "@core/store/useSettingsStore"
import { StartMenuLauncher } from "./types"

export function LauncherInformation({
  hoveredLauncher,
}: {
  hoveredLauncher: StartMenuLauncher | undefined
}) {
  const textScaling = useSettingsStore((state) => state.textScaling)
  const baseHeight = 3
  const minHeight = `${baseHeight * textScaling}rem`

  return (
    <div className="flex flex-col py-2 text-text items-end" style={{ minHeight }}>
      <div className="text-sm font-medium">{hoveredLauncher?.name || "\u00A0"}</div>
      <div className="text-xs line-clamp-1 text-ellipsis">
        {hoveredLauncher?.description || "\u00A0"}
      </div>
    </div>
  )
}
