import { useState } from "react"
import { CategoryList } from "./CategoryList"
import { CategoryOutput } from "./CategoryOutput"
import { LauncherInformation } from "./HoverInformation"
import { CategoryType, StartMenuLauncher } from "./types"
import { Sidebar } from "./Sidebar"
import { SearchInput } from "./SearchInput"
import { debugMessage } from "@shared/utils/utils"

export default function StartMenu() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all")
  const [hoveredLauncher, setHoveredLauncherId] = useState<StartMenuLauncher | undefined>(undefined)

  debugMessage("Rendering StartMenu", searchQuery, activeCategory, hoveredLauncher)

  return (
    <div className="h-full flex bg-window">
      <Sidebar onLauncherHovered={setHoveredLauncherId} />

      <div className="flex flex-1 flex-col m-4 mb-1 gap-1">
        <SearchInput onSearch={(e) => setSearchQuery(e.currentTarget.value)} />
        <MenuContent
          searchQuery={searchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onLauncherHovered={setHoveredLauncherId}
        />
        <LauncherInformation hoveredLauncher={hoveredLauncher} />
      </div>
    </div>
  )
}

function MenuContent({
  searchQuery,
  activeCategory,
  setActiveCategory,
  onLauncherHovered,
}: {
  searchQuery: string
  activeCategory: CategoryType
  setActiveCategory: (category: CategoryType) => void
  onLauncherHovered: (launcher: StartMenuLauncher | undefined) => void
}) {
  return (
    <div className="flex flex-1 min-h-0 start-menu">
      <CategoryList activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <CategoryOutput
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onLauncherHovered={onLauncherHovered}
      />
    </div>
  )
}
