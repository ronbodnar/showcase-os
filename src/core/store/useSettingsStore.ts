import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { Themes } from "@features/theme"
import { ThemeName, ThemeAccent } from "@features/theme/types"

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

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set, _get) => ({
        themeName: "Mint-Y (dark)",
        accent: Themes["Mint-Y (dark)"].accentOptions[0],
        wallpaperName: Themes["Mint-Y (dark)"].wallpaperOptions[1].name,
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
