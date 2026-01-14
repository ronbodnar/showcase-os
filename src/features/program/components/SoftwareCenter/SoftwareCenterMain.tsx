import { getProgramMeta } from "@features/program/registry"
import { ProgramId, ProgramMetadata } from "@features/program/types"
import { Button } from "@shared/components/Button"
import Icon from "@shared/components/Icon"
import { Carousel } from "./carousel/Carousel"
import { config } from "@config/config"

export interface SoftwareCenterMainProps {
  onSelectProgram: (programId: ProgramId) => void
}

export function SoftwareCenterMain({ onSelectProgram }: SoftwareCenterMainProps) {
  const { featured, projects, archived } = config.softwareCenter

  const bannerPrograms = featured.map((id) => ({
    id,
    meta: getProgramMeta(id),
  }))

  return (
    <>
      <header className="p-3 rounded-lg">
        <Carousel
          assets={bannerPrograms}
          onSelectProgram={onSelectProgram}
          className="h-30 lg:h-40 rounded-md"
        />
      </header>

      <section className="pt-3">
        <h2 className="text-md font-medium text-text pl-3 pb-2">Featured</h2>
        <ProgramGrid programs={featured} onSelectProgram={onSelectProgram} />
      </section>

      <section>
        <h2 className="text-md font-medium text-text pl-3 py-2">Projects</h2>
        <ProgramGrid programs={projects} onSelectProgram={onSelectProgram} />
      </section>

      <section>
        <h2 className="text-md font-medium text-text pl-3 py-2">Archived</h2>
        <ProgramGrid programs={archived} onSelectProgram={onSelectProgram} />
      </section>
    </>
  )
}

function ProgramGrid({
  programs,
  onSelectProgram,
}: {
  programs: ProgramId[]
  onSelectProgram: (programId: ProgramId) => void
}) {
  return (
    <div className="grid grid-cols-1 @sm:grid-cols-1 @md:grid-cols-2 @2xl:grid-cols-3 gap-3 @md:gap-1 px-3 py-1">
      {programs.map((program) => {
        const programMeta = getProgramMeta(program)
        return (
          <ProgramCard
            key={program}
            programMeta={programMeta}
            onClick={() => onSelectProgram(programMeta.id as ProgramId)}
          />
        )
      })}
    </div>
  )
}

function ProgramCard({
  programMeta,
  onClick,
}: {
  programMeta: ProgramMetadata
  onClick: () => void
}) {
  return (
    <Button
      color="surface-alt"
      className="flex p-3 border border-border-lighter rounded-sm shadow-2xl hover:shadow-lg shadow-window/10 transition-shadow"
      onClick={onClick}
    >
      {programMeta.icon && <Icon name={programMeta.icon} className="w-10 h-10 mr-3 rounded-md" />}

      <div className="flex flex-1 flex-col text-start">
        <h3 className="text-xs font-semibold text-text">{programMeta.name ?? "Unknown"}</h3>
        <p className="text-xs text-muted text-ellipsis line-clamp-1 mt-1">
          {programMeta.details?.description?.short}
        </p>
      </div>
    </Button>
  )
}
