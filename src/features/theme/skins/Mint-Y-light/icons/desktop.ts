import { IconMetadata } from "@features/theme/types"
import { desktopIcons as mintYDesktopIcons } from "../../Mint-Y/icons/desktop"

export const desktopIcons: Record<string, IconMetadata> = {
  ...mintYDesktopIcons,

  // Add custom icons for the theme here. Any icons not included are loaded from mintY icon set.
}

export default desktopIcons
