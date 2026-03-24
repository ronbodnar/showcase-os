import { ThemeIconSet } from "../types"
import desktopIconSet from "./icons.desktop"
import mobileIconSet from "./icons.mobile"
import sharedIconSet from "./icons.shared"

// Themes can override these icons if they wish, but they are theme agnostic.
export const defaultIconSet: ThemeIconSet = {
  ...desktopIconSet,
  ...mobileIconSet,
  ...sharedIconSet,
} as ThemeIconSet

export default defaultIconSet
