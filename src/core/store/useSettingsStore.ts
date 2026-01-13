import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { Themes } from "@features/theme"
import { ThemeName, ThemeAccent } from "@features/theme/types"
import { config } from "@config/config"

interface SettingsState {
  themeName: ThemeName
  accent: ThemeAccent
  wallpaperName: string
  textScaling: number

  setThemeName: (themeName: ThemeName) => void
  setAccent: (accent: ThemeAccent) => void
  setWallpaperName: (wallpaperName: string) => void
  setTextScaling: (textScaling: number) => void
}

export const SETTINGS_STORE_NAME = "settings-store"

const colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
const defaultTheme = config.defaultTheme[colorScheme]

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set, _get) => ({
        themeName: defaultTheme,
        accent: Themes[defaultTheme].accentOptions[0],
        wallpaperName: Themes[defaultTheme].wallpaperOptions[1].name,
        textScaling: 1,

        setThemeName: (themeName) =>
          set((state) => (themeName === state.themeName ? state : { themeName })),
        setAccent: (accent) => set((state) => (accent === state.accent ? state : { accent })),
        setWallpaperName: (wallpaperName) =>
          set((state) => (wallpaperName === state.wallpaperName ? state : { wallpaperName })),
        setTextScaling: (textScaling) =>
          set((state) => (textScaling === state.textScaling ? state : { textScaling })),
      }),
      { name: SETTINGS_STORE_NAME },
    ),
    { name: SETTINGS_STORE_NAME },
  ),
)
