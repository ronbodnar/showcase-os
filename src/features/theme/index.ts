import { Theme } from "./types"
import { theme as MintYDark } from "./skins/Mint-Y"
import { theme as MintYLight } from "./skins/Mint-Y-light"

export const Themes = {
  "Mint-Y (dark)": MintYDark,
  "Mint-Y (light)": MintYLight,
} as const satisfies Record<string, Theme>
