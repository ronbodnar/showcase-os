import { osService } from "@core/services/osService"
import { useSettingsStore } from "@core/store/useSettingsStore"
import { Themes } from ".."
import { preloadImages } from "../helpers"
import { IconName, ThemeAccent, ThemeName, WallpaperResolution } from "../types"
import { getAllProgramMetadata } from "@features/program/registry"
import { wallpapers } from "../assets/wallpaper"
import { debugMessage } from "@shared/utils/utils"

export const themeService = {
  /**
   * Loads icons for the currently active theme based on the user's platform (desktop, mobile).
   */
  loadIcons: async (themeName?: ThemeName) => {
    const platform = osService.getPlatform()
    const userThemeName = useSettingsStore.getState().themeName

    const theme = Themes[themeName ?? userThemeName]
    const icons = await theme.loadIcons(platform)
    theme.icons = icons

    // is there where i should just put preloading everything i need for the system? start menu icons (pretty much all program icons), etc?
  },

  preloadAssets: async () => {
    const names: IconName[] = [
      "User",
      "StartMenu",
      "Apps",
      "DeveloperApps",
      "LinkedIn",
      "GitHub",
      "SystemApps",
      "Search",
      "Shutdown",
      "LockScreen",
      "Terminal",
      "SystemSettings",
      "VSCode",
      "SoftwareCenter",
    ]
    const programNames: (IconName | undefined)[] = getAllProgramMetadata().map((p) => p.icon)
    const { themeName } = useSettingsStore.getState()
    const theme = Themes[themeName]
    const assets = [...names, ...programNames]
      .filter((name) => name !== undefined)
      .map((name) => theme.icons[name]?.src)

    const stringAssets = assets.filter(
      (src): src is string => src !== undefined && typeof src === "string",
    )
    preloadImages(stringAssets)
  },

  initializeTheme: async () => {
    const { themeName, wallpaperName, accent, textScaling } = useSettingsStore.getState()
    await themeService.applyWallpaper(wallpaperName)
    applyStaticStyles(themeName, accent, textScaling)
  },

  /**
   * Loads the provided wallpaper and updated the settings and theme to use this wallpaper.
   */
  applyWallpaper: async (wallpaperName: string) => {
    const settingsStore = useSettingsStore.getState()
    const wallpaper = wallpapers[wallpaperName]
    if (!wallpaper) {
      debugMessage(`No wallpaper found with name "${wallpaperName}"!`)
      return
    }
    settingsStore.setWallpaperName(wallpaperName)

    const resolution = detectResolution()
    const loader = wallpaper.loaders[resolution]
    if (!loader) {
      debugMessage(`No wallpaper loader found for resolution "${resolution}"!`)
      return
    }

    const wallpaperModule = await wallpaper.loaders[resolution]()
    const wallpaperSrc = wallpaperModule.default

    // Preload the image to prevent it from being loaded later. Usually not a problem but good for slower connections.
    await preloadImages([wallpaperSrc])

    document.documentElement.style.setProperty("--wallpaper", `url(${wallpaperSrc})`)
  },

  applyTextScaling: (textScaling: number) => {
    const { themeName, accent, setTextScaling } = useSettingsStore.getState()
    setTextScaling(textScaling)
    applyStaticStyles(themeName, accent, textScaling)
  },

  applyAccent: (accent: ThemeAccent) => {
    const { themeName, setAccent } = useSettingsStore.getState()
    setAccent(accent)
    applyStaticStyles(themeName, accent)
  },

  /**
   * Sets the provided theme and overwrite the user accent and wallpaper settings. Used when the user is changing themes manually.
   */
  applyTheme: async (themeName: ThemeName) => {
    const theme = Themes[themeName]
    if (!theme) {
      debugMessage(`No theme found with name "${themeName}"!`)
      return
    }

    debugMessage("Applying theme", themeName, theme)

    const { setThemeName, setAccent, setWallpaperName } = useSettingsStore.getState()

    await themeService.applyWallpaper(theme.defaultWallpaper.name)
    await themeService.loadIcons(theme.name as ThemeName)
    applyStaticStyles(themeName, theme.accentOptions[0])

    setWallpaperName(theme.defaultWallpaper.name)
    setAccent(theme.accentOptions[0])
    setThemeName(themeName)
  },
}

function applyStaticStyles(themeName: ThemeName, accent: ThemeAccent, textScaling?: number) {
  const theme = Themes[themeName]
  const root = document.documentElement

  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVariable = `--color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
    if (key === "accent") {
      root.style.setProperty(cssVariable, accent?.color ?? value)
    } else if (key === "accentHover") {
      root.style.setProperty(cssVariable, accent?.hover ?? value)
    } else {
      root.style.setProperty(cssVariable, value)
    }
  })

  if (textScaling !== undefined) {
    const scalingMap: Record<string, number> = {
      "2xl": 1.25,
      "xl": 1.15,
      "lg": 1.05,
      "md": 0.95,
      "sm": 0.85,
      "xs": 0.75,
    }

    Object.entries(scalingMap).forEach(([size, multiplier]) => {
      root.style.setProperty(`--text-${size}`, `${textScaling * multiplier}rem`)
    })
  }
}

function detectResolution(): WallpaperResolution {
  const widthPx = window.innerWidth * window.devicePixelRatio
  const heightPx = window.innerHeight * window.devicePixelRatio
  const isPortrait = heightPx > widthPx

  /*
   * desktop-ultrawide = 5160x2160
   * desktop-4k = 3840x2160
   * desktop-1440p = 2560x1440
   * desktop-1080p = 1920x1080
   *
   * mobile-1440p = 1440x2960
   * mobile-1080p = 1080x1920
   *
   * thumbnail = 350 x 150
   */

  if (isPortrait) {
    if (heightPx > 1920) return "mobile-1440p"
    return "mobile-1080p"
  }

  if (widthPx <= 1920) return "desktop-1080p"
  if (widthPx <= 2560) return "desktop-1440p"
  if (widthPx >= 3440 && heightPx <= 2000) return "desktop-ultrawide"
  return "desktop-4k"
}
