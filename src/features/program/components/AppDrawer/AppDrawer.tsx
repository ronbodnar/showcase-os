import { v4 as uuidv4 } from "uuid"
import { useMemo } from "react"
import MobileLauncher from "@features/launcher/components/MobileLauncher"
import { getLauncherMeta } from "@features/launcher/registry"
import { getAllProgramMetadata } from "@features/program/registry"
import { ProgramId } from "@features/program/types"

export default function AppDrawer() {
  const allPrograms = useMemo(
    () =>
      getAllProgramMetadata().filter((p) => p.window?.isEphemeral !== true && p.disabled !== true),
    [],
  )

  return (
    <div className="w-full min-h-full grid grid-cols-3 gap-3 text-text px-5 my-5">
      {allPrograms.map((meta) => {
        const launcherMeta = getLauncherMeta(meta.id as ProgramId)
        return (
          <MobileLauncher
            key={meta.id}
            id={uuidv4()}
            iconSize={48}
            meta={{ ...launcherMeta, draggable: false }}
          />
        )
      })}
    </div>
  )
}
