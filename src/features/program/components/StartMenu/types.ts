import { IconName } from "@features/theme/types"

export interface StartMenuLauncher {
  name: string
  description: string
}

export type CategoryType = "all" | "system" | "developer"

export interface CategoryListItem {
  category: CategoryType
  name: string
  icon: IconName
}
