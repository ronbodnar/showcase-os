import { OSPlatform } from "@core/store/useOSStore"
import { wallpapers } from "@features/theme/assets/wallpaper"
import { Theme } from "@features/theme/types"

export const theme: Theme = {
  name: "Mint-Y (light)",
  scheme: "light",
  accentOptions: [
    { name: "green", color: "oklch(52.7% 0.154 150.069)", hover: "oklch(62% 0.154 150.069)" },
    { name: "blue", color: "#3b82f6", hover: "#3b82f6" },
    { name: "purple", color: "#9244db", hover: "#a855f7" },
    { name: "red", color: "#931A1A", hover: "#931A1A" },
  ],
  colors: {
    shell: "#f9f9fa",
    window: "#d2d3d6",
    surface: "#eaebed",
    surfaceAlt: "#e8e8e6",
    surfaceHover: "#bab9bd",
    surfaceHoverAlt: "#9c9ba3",
    surfaceAccent: "#f0f4ff",
    surfaceAccentHover: "#e0e7ff",
    text: "#3d3d3c",
    muted: "#6b7280",
    accent: "#34d399",
    accentHover: "#6ee7b7",
    danger: "#f87171",
    dangerHover: "#fca5a5",
    border: "oklch(75% 0.02 280)",
    borderDarker: "oklch(65% 0.03 280)",
    borderLighter: "oklch(85% 0.01 280)",
    scrollbar: "oklch(90% 0.01 280)",
  },
  font: {
    body: "Inter",
    monospace: "JetBrains Mono",
  },
  defaultWallpaper: wallpapers.Nature,
  wallpaperOptions: Object.values(wallpapers),
  icons: {},
  loadIcons: async (platform: OSPlatform) => {
    const defaultIconsModule = await import("../../assets/icons")
    const defaultIcons = defaultIconsModule.default

    const sharedIconsModule = await import("./icons/shared")
    const sharedIcons = sharedIconsModule.default

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let platformIconsModule: any
    if (platform === "desktop") {
      platformIconsModule = await import(`./icons/desktop`)
    } else if (platform === "mobile") {
      platformIconsModule = await import(`./icons/mobile`)
    }
    const platformIcons = platformIconsModule.default

    return { ...defaultIcons, ...sharedIcons, ...platformIcons }
  },
}
