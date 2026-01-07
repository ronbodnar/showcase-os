import { IconMetadata } from "@features/theme/types"
import { mobileIcons as mintYMobileIcons } from "../../Mint-Y/icons/mobile"

export const mobileIcons: Record<string, IconMetadata> = {
  ...mintYMobileIcons,

  // Add custom icons for the theme here. Any icons not included are loaded from mintY icon set.
}

export default mobileIcons
