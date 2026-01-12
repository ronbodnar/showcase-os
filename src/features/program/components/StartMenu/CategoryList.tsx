import Icon from "@shared/components/Icon"
import { CategoryType, CategoryListItem } from "./types"

export function CategoryList({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: CategoryType
  setActiveCategory: (category: CategoryType) => void
}) {
  const categories: CategoryListItem[] = [
    {
      category: "all",
      name: "All Applications",
      icon: "Apps",
    },
    {
      category: "system",
      name: "System",
      icon: "SystemApps",
    },
    {
      category: "developer",
      name: "Developer",
      icon: "DeveloperApps",
    },
  ]

  return (
    <div className="flex flex-col my-2 shrink-0">
      {categories.map((category) => {
        const background = category.category === activeCategory ? "bg-surface" : ""
        return (
          <div
            key={category.name}
            className={`flex items-center p-2 gap-2 hover:bg-surface rounded-sm ${background}`}
            onMouseEnter={() => setActiveCategory(category.category)}
          >
            <Icon name={category.icon} className="w-5 h-5 text-text" />
            <span className="text-sm text-text">{category.name}</span>
          </div>
        )
      })}
    </div>
  )
}
