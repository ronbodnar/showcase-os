import { describe, it, expect, vi, beforeEach } from "vitest"
import { themeService } from "./themeService"

const { mockSettingsStore } = vi.hoisted(() => ({
  mockSettingsStore: { getState: vi.fn() },
}))

vi.mock("@core/store/useSettingsStore", () => ({ useSettingsStore: mockSettingsStore }))
vi.mock("@core/services/osService")
vi.mock("../helpers", () => ({ preloadImages: vi.fn() }))
vi.mock("@features/program/registry")
vi.mock("@shared/utils/utils")

const THEME_KEY = "Mint-Y (dark)"

vi.mock("..", () => ({
  Themes: {
    "Mint-Y (dark)": {
      name: "Mint-Y (dark)",
      icons: {},
      colors: { background: "#000", accent: "#f00" },
      accentOptions: [{ name: "Red", color: "#f00", hover: "#ff0" }],
      defaultWallpaper: { name: "mountains" },
    },
  },
}))

vi.mock("../assets/wallpaper", () => ({
  wallpapers: {
    mountains: {
      loaders: {
        "desktop-1080p": vi.fn().mockResolvedValue({ default: "img-src" }),
      },
    },
  },
}))

describe("themeService", () => {
  const setWallpaperSpy = vi.fn()
  const setAccentSpy = vi.fn()
  const setThemeNameSpy = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    mockSettingsStore.getState.mockReturnValue({
      themeName: THEME_KEY,
      wallpaperName: "mountains",
      accent: { name: "Red", color: "#f00", hover: "#ff0" },
      setWallpaperName: setWallpaperSpy,
      setAccent: setAccentSpy,
      setThemeName: setThemeNameSpy,
      setTextScaling: vi.fn(),
    })

    document.documentElement.style.setProperty = vi.fn()
    Object.defineProperty(window, "innerWidth", { writable: true, value: 1920 })
    Object.defineProperty(window, "innerHeight", { writable: true, value: 1080 })
    Object.defineProperty(window, "devicePixelRatio", { writable: true, value: 1 })
  })

  describe("applyWallpaper", () => {
    it("should detect resolution, load image, and update CSS variables", async () => {
      await themeService.applyWallpaper("mountains")

      expect(setWallpaperSpy).toHaveBeenCalledWith("mountains")
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        "--wallpaper",
        "url(img-src)",
      )
    })
  })

  describe("applyAccent", () => {
    it("should update store and CSS variables", () => {
      const newAccent = { name: "blue", color: "#00f", hover: "#00a" }

      themeService.applyAccent(newAccent)

      expect(setAccentSpy).toHaveBeenCalledWith(newAccent)
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        "--color-accent",
        "#00f",
      )
    })
  })
})
