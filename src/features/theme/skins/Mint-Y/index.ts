import { OSPlatform } from "@core/store/useOSStore"
import { IconMetadata, Theme } from "../../types"
import { wallpapers } from "../../assets/wallpaper"

export const theme: Theme = {
  name: "Mint-Y (dark)",
  scheme: "dark",
  accentOptions: [
    { name: "green", color: "oklch(52.7% 0.154 150.069)", hover: "oklch(62% 0.154 150.069)" },
    { name: "blue", color: "#3b82f6", hover: "#3b82f6" },
    { name: "purple", color: "#9244db", hover: "#a855f7" },
    { name: "red", color: "#931A1A", hover: "#931A1A" },
  ],
  colors: {
    shell: "#1c1c20",
    window: "#222226",
    surface: "#2e2e33",
    surfaceAlt: "#333338",
    surfaceHover: "#3a3a3f",
    surfaceHoverAlt: "#44444c",
    surfaceAccent: "#44444c",
    surfaceAccentHover: "#4c4c52",
    text: "#e4e4e5",
    muted: "#8c8486",
    accent: "oklch(52.7% 0.154 150.069)",
    accentHover: "oklch(62% 0.154 150.069)",
    danger: "oklch(55% 0.2368 25.41)",
    dangerHover: "oklch(60% 0.2368 25.41)",
    border: "oklch(24.5% 0.006 286)",
    borderDarker: "oklch(0.1156 0.0032 285.88)",
    borderLighter: "oklch(0.283 0.0091 285.81)",
    scrollbar: "oklch(0.541 0.007 294)",
  },
  font: {
    body: "Inter",
    monospace: "JetBrains Mono",
  },
  defaultWallpaper: wallpapers.Nebula,
  wallpaperOptions: Object.values(wallpapers),
  icons: {}, // Icons are loaded in themeService and made available here for synchronous access
  loadIcons: async (platform: OSPlatform) => {
    const defaultIconsModule = await import("../../assets/icons")
    const defaultIcons = defaultIconsModule.default

    const sharedIconsModule = await import("./icons/shared")
    const sharedIcons = sharedIconsModule.default

    let platformIcons: Record<string, IconMetadata> = {}
    if (platform === "desktop") {
      const desktopIconsModule = await import("./icons/desktop")
      platformIcons = desktopIconsModule.default
    } else if (platform === "mobile") {
      const mobileIconsModule = await import("./icons/mobile")
      platformIcons = mobileIconsModule.default
    }

    return { ...defaultIcons, ...sharedIcons, ...platformIcons }
  },
}
