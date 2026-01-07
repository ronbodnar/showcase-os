import { Theme } from "./types"
import { theme as MintY } from "./skins/Mint-Y"
import { theme as Fluent } from "./skins/Mint-Y-light"

export const Themes = {
  "Mint-Y (dark)": MintY,
  "Mint-Y (light)": Fluent,
} as const satisfies Record<string, Theme>
