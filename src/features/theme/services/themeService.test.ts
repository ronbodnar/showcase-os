/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest"
import { themeService } from "./themeService"
import { osService } from "@core/services/osService"
import { Themes } from ".."
import { preloadImages } from "../helpers"
import { getAllProgramMetadata } from "@features/program/registry"

const { mockSettingsStore } = vi.hoisted(() => ({
  mockSettingsStore: { getState: vi.fn() },
}))

vi.mock("@core/store/useSettingsStore", () => ({ useSettingsStore: mockSettingsStore }))
vi.mock("@core/services/osService")
vi.mock("../helpers", () => ({ preloadImages: vi.fn() }))
vi.mock("@features/program/registry")
vi.mock("@shared/utils/utils")

// Use a consistent key for the theme across mock and tests
const THEME_KEY = "Mint-Y (dark)"

vi.mock("..", () => ({
  Themes: {
    "Mint-Y (dark)": {
      name: "Mint-Y (dark)",
      loadIcons: vi.fn().mockResolvedValue({ Terminal: { src: "term.png" } }),
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

  describe("loadIcons", () => {
    it("should load icons for the specific theme and platform", async () => {
      vi.mocked(osService.getPlatform).mockReturnValue("desktop")

      await themeService.loadIcons(THEME_KEY as any)

      expect(Themes[THEME_KEY].loadIcons).toHaveBeenCalledWith("desktop")
      expect(Themes[THEME_KEY].icons).toEqual({ Terminal: { src: "term.png" } })
    })
  })

  describe("preloadAssets", () => {
    it("should extract source strings from theme icons and call preload", async () => {
      Themes[THEME_KEY].icons = {
        User: { src: "user.png" },
        Terminal: { src: "term.png" },
      }
      vi.mocked(getAllProgramMetadata).mockReturnValue([{ icon: "Terminal" }] as any)

      await themeService.preloadAssets()

      expect(preloadImages).toHaveBeenCalledWith(expect.arrayContaining(["user.png", "term.png"]))
    })
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

  describe("applyTheme", () => {
    it("should coordinate wallpaper and icon loading", async () => {
      // We spy on internal methods to ensure they are called by applyTheme
      const wallpaperSpy = vi.spyOn(themeService, "applyWallpaper").mockResolvedValue(undefined)
      const iconsSpy = vi.spyOn(themeService, "loadIcons").mockResolvedValue(undefined)

      await themeService.applyTheme(THEME_KEY as any)

      expect(wallpaperSpy).toHaveBeenCalledWith("mountains")
      expect(iconsSpy).toHaveBeenCalledWith(THEME_KEY)
      expect(setThemeNameSpy).toHaveBeenCalledWith(THEME_KEY)
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
