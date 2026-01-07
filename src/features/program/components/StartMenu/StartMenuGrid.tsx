import { v4 as uuidv4 } from "uuid"
import { memo } from "react"
import { StartMenuLauncher } from "./types"
import GridLauncher from "@features/launcher/components/GridLauncher"
import { LauncherMetadata } from "@features/launcher/types"
import { getProgramMetaFromTarget } from "@features/launcher/utils/launcher.utils"

interface Props {
  id: string
  launchers: LauncherMetadata[]
  iconSize?: number
  onLauncherHovered?: (launcher: StartMenuLauncher | undefined) => void
}

export const StartMenuGrid = memo(function StartMenuGrid({
  id,
  launchers,
  iconSize = 40,
  onLauncherHovered,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-start p-2.5">
      {launchers.map((l, index) => {
        const program = getProgramMetaFromTarget(l.target)
        const name = l.label ?? program?.name ?? ""
        const description = l.description ?? program?.details?.description?.short ?? ""

        return (
          <div
            key={`${id}-${index}`}
            onMouseEnter={() =>
              l.disabled ? undefined : onLauncherHovered?.({ name, description })
            }
            onMouseLeave={() => (l.disabled ? undefined : onLauncherHovered?.(undefined))}
          >
            <GridLauncher
              id={uuidv4()}
              meta={l}
              iconSize={iconSize}
              drawLabel={false}
              className={`p-2.5 h-full w-full ${l.disabled ? "" : "hover:bg-surface-hover-alt"} rounded-md`}
            />
          </div>
        )
      })}
    </div>
  )
})
