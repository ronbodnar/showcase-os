import { makeWallpaper } from "../helpers"
import { ThemeWallpaper } from "../types"

const BASE_PATH = "../../../assets/wallpaper/"

export const wallpaperModules = import.meta.glob<{ default: string }>(
  "../../../assets/wallpaper/**",
)

export const wallpapers: Record<string, ThemeWallpaper> = {
  Moon: makeWallpaper("Moon", BASE_PATH, "moon"),
  Nebula: makeWallpaper("Nebula", BASE_PATH, "nebula"),
  Nature: makeWallpaper("Nature", BASE_PATH, "nature"),
}
