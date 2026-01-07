import { useState } from "react"
import MenuLauncher, { MenuLauncherProps } from "@features/launcher/components/MenuLauncher"
import { getLauncherMeta } from "@features/launcher/registry"
import { getAllProgramMetadata } from "@features/program/registry"
import { ProgramMetadata, ProgramId } from "@features/program/types"
import { ScrollableContainer } from "@shared/components/ScrollableContainer"
import { CategoryType, StartMenuLauncher } from "./types"

export function CategoryOutput({
  activeCategory,
  searchQuery,
  onLauncherHovered,
}: {
  activeCategory: CategoryType
  searchQuery: string
  onLauncherHovered: (launcher: StartMenuLauncher | undefined) => void
}) {
  const [contextMenuProgram, setContextMenuProgram] = useState<ProgramMetadata | undefined>(
    undefined,
  )

  const searchMatches = (matchText: string, searchQuery: string) => {
    return matchText.toLowerCase().includes(searchQuery.toLowerCase())
  }

  const isActiveCategory = (p: ProgramMetadata) =>
    activeCategory === "all" || p.category === activeCategory

  const isSearchQuery = (p: ProgramMetadata) =>
    searchQuery === "" ||
    searchMatches(p.name, searchQuery) ||
    searchMatches(p.details?.description?.short ?? "", searchQuery) ||
    searchMatches(p.details?.description?.long ?? "", searchQuery) ||
    p.details?.technologies?.some((t) => searchMatches(t, searchQuery))

  const programs = getAllProgramMetadata()
    .filter((p) => !p.window?.isEphemeral && !p.disabled && isSearchQuery(p) && isActiveCategory(p))
    .sort((a, b) => a.name.localeCompare(b.name))

  function handleMouseEnter(p: ProgramMetadata) {
    if (p.disabled) {
      return
    }

    onLauncherHovered({
      name: p.name,
      description: p.details?.description?.short ?? "",
    })
  }

  function handleContextMenu(p: ProgramMetadata) {
    if (p.disabled) {
      return
    }
    const isShowingContextMenu = contextMenuProgram?.id === p.id
    setContextMenuProgram(isShowingContextMenu ? undefined : p)
  }

  return (
    <ScrollableContainer className="mt-2 ml-6" childrenClassName="pr-1">
      {programs.map((p) => {
        const launcherMeta = getLauncherMeta(p.id as ProgramId)
        const disabled = launcherMeta.disabled ?? p.disabled
        return (
          <div key={p.id} className="w-full">
            <div
              onMouseEnter={() => handleMouseEnter(p)}
              onMouseLeave={() => onLauncherHovered(undefined)}
              onContextMenu={() => handleContextMenu(p)}
            >
              <MenuLauncher
                label={p.name}
                icon={p.icon ?? "AppPlaceholder"}
                iconSize={22}
                labelSize={14}
                meta={{
                  ...launcherMeta,
                  disabled: disabled,
                }}
                className={`p-2 ${disabled ? "" : "hover:bg-surface-alt"}`}
              />
            </div>

            {contextMenuProgram?.id === p.id && <EmbeddedContextMenu activeProgram={p} />}
          </div>
        )
      })}
    </ScrollableContainer>
  )
}

function EmbeddedContextMenu({ activeProgram }: { activeProgram: ProgramMetadata }) {
  if (!activeProgram) {
    return null
  }

  const options: MenuLauncherProps[] = [
    {
      label: "Add to panel",
      icon: "Add",
      iconSize: 14,
      labelSize: 12,
      meta: {
        target: {
          type: "action",
          action: "addLauncherToPanel",
          args: { meta: getLauncherMeta(activeProgram.id as ProgramId) },
        },
      },
    },
    {
      label: "Add to desktop",
      icon: "Computer",
      iconSize: 14,
      labelSize: 12,
      meta: {
        target: {
          type: "action",
          action: "addLauncherToHome",
          args: { meta: getLauncherMeta(activeProgram.id as ProgramId) },
        },
      },
    },
  ]
  return (
    <div className="px-2 mx-1">
      {options.map((option) => {
        return (
          <MenuLauncher
            key={option.label}
            label={option.label}
            icon={option.icon}
            iconSize={option.iconSize}
            labelSize={option.labelSize}
            meta={option.meta}
            className={`p-2 px-5 text-sm hover:bg-surface-alt`}
          />
        )
      })}
    </div>
  )
}
