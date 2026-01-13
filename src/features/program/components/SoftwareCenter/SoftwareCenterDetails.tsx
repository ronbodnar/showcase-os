import { useEffect, useState } from "react"
import { useOSStore } from "@core/store/useOSStore"
import { getLauncherMeta } from "@features/launcher/registry"
import { LauncherProgramTarget } from "@features/launcher/types"
import { ProgramId, ProgramMetadata } from "@features/program/types"
import { preloadImages } from "@features/theme/helpers"
import { IconName } from "@features/theme/types"
import { Button } from "@shared/components/Button"
import { IconList } from "@shared/components/IconList"
import Icon from "@shared/components/Icon"
import { ProgramLoading } from "@shared/components/ProgramLoading"
import { VisualStudioCodeProps } from "../VisualStudioCode/VisualStudioCode"
import { ImageCarousel } from "./carousel/ImageCarousel"
import { useTheme } from "@features/theme/hooks/useTheme"
import { launcherService } from "@features/launcher/services/launcherService"

interface SoftwareCenterDetailsProps {
  programId: ProgramId
  programMeta: ProgramMetadata
}

export function SoftwareCenterDetails({ programId, programMeta }: SoftwareCenterDetailsProps) {
  const [loading, setLoading] = useState(true)
  const { icon, name, details, disabled } = programMeta
  const { githubUrl, description, imageUrls: images } = details ?? {}

  const theme = useTheme()
  const oppositeScheme = theme.scheme === "dark" ? "light" : "dark"
  const filteredImages = images?.filter((image) => !image.includes(`${oppositeScheme}-mode`))

  const isMobile = useOSStore((state) => state.platform === "mobile")

  useEffect(() => {
    async function preload() {
      await preloadImages(filteredImages ?? [])
      setLoading(false)
    }
    preload()
  }, [filteredImages])

  const launchVSCode = (repository: string) => {
    const vscode = getLauncherMeta("visual_studio_code")
    launcherService.openLauncher({
      ...vscode,
      target: {
        ...(vscode.target as LauncherProgramTarget),
        args: {
          githubRepoUrl: repository,
        } satisfies VisualStudioCodeProps,
      },
    })
  }

  const launcherMeta = getLauncherMeta(programId)

  if (loading) {
    return <ProgramLoading />
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto lg:overflow-hidden">
      <Header
        icon={icon}
        name={name}
        description={description?.short}
        onLaunchProgram={
          disabled || (programMeta.runnable === false && details)
            ? undefined
            : () => launcherService.openLauncher(launcherMeta, false)
        }
        onLaunchVSCode={
          isMobile || githubUrl === undefined ? undefined : () => launchVSCode(githubUrl)
        }
      />

      {/* Scrollable content */}
      <main className="flex-1 flex flex-col gap-3 py-3 md:p-4 lg:overflow-y-auto">
        {filteredImages && (
          <section className="flex justify-center">
            <ImageCarousel
              images={filteredImages}
              autoPlay={false}
              className="h-[40vh] max-h-[450px] rounded-sm"
            />
          </section>
        )}

        <DetailsSection programId={programId} programMeta={programMeta} />
      </main>
    </div>
  )
}

function Header({
  icon,
  name,
  description,
  onLaunchProgram,
  onLaunchVSCode,
}: {
  icon: IconName | undefined
  name: string
  description?: string
  onLaunchProgram: (() => void) | undefined
  onLaunchVSCode: (() => void) | undefined
}) {
  const buttonClass = "rounded-sm border border-border px-4 py-1.5"
  return (
    <div className="flex flex-col lg:sticky lg:top-0 lg:z-10 px-4 py-2 border-b border-border">
      <header className="flex flex-col md:flex-row items-center justify-between gap-3 bg-surface">
        <div className="flex gap-3">
          <Icon name={icon ?? "AppPlaceholder"} className="w-16 h-16 rounded-lg" />
          <div>
            <h1 className="text-md font-medium text-text">{name}</h1>
            {description && <p className="text-xs text-text mt-1">{description}</p>}
          </div>
        </div>

        <div className="h-full flex flex-row md:flex-col w-full md:w-45 gap-3 md:gap-1 justify-center text-text text-sm">
          <Button
            color="accent"
            className={buttonClass}
            onClick={onLaunchProgram}
            disabled={onLaunchProgram === undefined}
          >
            Launch
          </Button>
          <Button
            color="surface"
            className={buttonClass}
            onClick={onLaunchVSCode}
            disabled={onLaunchVSCode === undefined}
            tooltipText={
              onLaunchVSCode
                ? undefined
                : "This project cannot be opened in VSCode because the source code is private."
            }
          >
            Open with <Icon name="VSCode" className="w-4 h-4" />
          </Button>
        </div>
      </header>
    </div>
  )
}

function DetailsSection({
  programId,
  programMeta,
}: {
  programId: ProgramId
  programMeta: ProgramMetadata
}) {
  const { githubUrl, publicUrl, technologies = [], year, description } = programMeta.details ?? {}
  return (
    <section>
      <HeaderRow />

      <div className="flex flex-col md:flex-row flex-wrap gap-3 text-sm m-0 p-3 border border-border border-t-0">
        <Details id={programId} year={year} githubUrl={githubUrl} publicUrl={publicUrl} />
        <TechnologiesList id={programId} technologies={technologies} />

        <LongDescription description={description?.long} />
      </div>
    </section>
  )
}

function HeaderRow() {
  return (
    <div className="grid grid-cols-2">
      <div className="py-1 text-sm text-center text-text border border-border border-b-0">
        Details
      </div>
      <div className="py-1 text-sm text-center border-b border-border"></div>
    </div>
  )
}

function Details({
  id,
  year,
  githubUrl,
  publicUrl,
}: {
  id: string
  year?: { start: number; end?: number }
  githubUrl?: string
  publicUrl?: string
}) {
  let years = year?.start ?? "Unknown"
  if (year?.end) {
    years = `${years} - ${year.end}`
  } else if (year?.start) {
    years = `${years} - Present`
  }
  const details = [
    { label: "Name", value: id.replace(/_/g, "-"), type: "text", className: "font-medium" },
    { label: "Year(s)", value: years, type: "text" },
    { label: "Repository", value: githubUrl ?? "Private", type: "link" },
    { label: "Public URL", value: publicUrl, type: "link" },
  ]
  return (
    <div className="flex flex-col text-text gap-3 md:gap-1 select-text">
      {details.map(({ label, value, type, className }) => {
        switch (type) {
          case "text":
            return (
              <div key={label} className="flex flex-col md:grid md:grid-cols-12 gap-1 select-text">
                <span className="text-muted md:col-span-4">{label.padEnd(30)}</span>
                <span className={`col-span-8 ${className}`}>{value}</span>
              </div>
            )

          case "link":
            return (
              typeof value === "string" && (
                <div
                  key={label}
                  className="flex flex-col md:grid md:grid-cols-12 gap-1 select-text"
                >
                  <span className="text-muted md:col-span-4">{label}</span>
                  {value.startsWith("http") ? (
                    <a
                      key={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={value}
                      className="underline hover:brightness-110 md:col-span-8"
                    >
                      {value}
                    </a>
                  ) : (
                    <span key={label} className="md:col-span-8">
                      {value}
                    </span>
                  )}
                </div>
              )
            )
        }
      })}
    </div>
  )
}

function TechnologiesList({ id, technologies }: { id: string; technologies: string[] }) {
  if (technologies.length === 0) return null

  return (
    <div className="flex flex-col flex-1 md:items-end gap-3">
      <h3 className="font-medium text-muted">Technologies</h3>
      <div className="flex flex-wrap md:justify-end text-text">
        <IconList id={id} icons={technologies} />
      </div>
    </div>
  )
}

function LongDescription({ description }: { description?: string }) {
  if (!description) return null

  const formattedDescription = description.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")

  return (
    <div className="flex flex-col w-full pt-5 mt-2 gap-3 text-text border-t border-border-lighter">
      <p
        className="text-text whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: formattedDescription }}
      ></p>
    </div>
  )
}
