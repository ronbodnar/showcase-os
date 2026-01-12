import { useSettingsStore } from "@core/store/useSettingsStore"
import { Themes } from "@features/theme"
import { useTheme } from "@features/theme/hooks/useTheme"
import { useWallpaperThumbs } from "@features/theme/hooks/useWallpaperThumbs"
import { themeService } from "@features/theme/services/themeService"
import { ThemeName } from "@features/theme/types"
import { Button } from "@shared/components/Button"
import { ProgramLoading } from "@shared/components/ProgramLoading"

const themeOptions = Object.keys(Themes).map((name) => ({ id: name, label: name }))

export default function SystemSettings() {
  const { themeName, accent, wallpaperName, textScaling } = useSettingsStore()

  const theme = useTheme()
  const { loaded, thumbs } = useWallpaperThumbs(theme)

  return (
    <div className="flex flex-col gap-6 p-4 w-full h-full overflow-auto">
      {/* Wallpaper Section */}
      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-text">Wallpaper</h3>
        <div className="grid grid-cols-2 @md:grid-cols-3 @2xl:grid-cols-4 @4xl:grid-cols-5 gap-3 bg-window p-3 rounded-md border border-border">
          {!loaded && <ProgramLoading />}
          {loaded &&
            theme?.wallpaperOptions.map((w) => (
              <Button
                key={w.name}
                color="window"
                onClick={async () => await themeService.applyWallpaper(w.name)}
                className={`flex-col items-start rounded-md overflow-hidden border ${
                  wallpaperName === w.name
                    ? "ring-2 ring-accent"
                    : "border-surface-alt hover:ring-surface-hover hover:ring-2"
                }`}
              >
                <img src={thumbs[w.name]} alt={w.name} className="w-full h-24 object-cover" />
                <span className="p-2 text-text text-sm font-medium">{w.name}</span>
              </Button>
            ))}
        </div>
      </section>

      {/* Theme Section */}
      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-text">Theme</h3>
        <div className="flex flex-col gap-4 bg-window p-3 rounded-md border border-border">
          {/* Skin Dropdown */}
          <div className="flex items-center gap-4">
            <label className="text-sm text-text w-28">Skin</label>
            <select
              value={themeName}
              onChange={async (e) => await themeService.applyTheme(e.target.value as ThemeName)}
              className="grow w-64 p-2 text-sm rounded bg-surface text-text border border-border focus:outline-none focus:ring-2 focus:ring-accent hover:cursor-pointer "
            >
              {themeOptions.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Accent Colors */}
          <div className="flex items-center gap-4">
            <label className="text-sm text-text w-28">Accent Color</label>
            <div className="flex gap-2">
              {theme?.accentOptions.map((a) => (
                <Button
                  color="window"
                  key={a.name}
                  onClick={() => themeService.applyAccent(a)}
                  className={`w-10 h-10 rounded border ${
                    accent?.name === a.name
                      ? "ring-2 ring-accent"
                      : "border-border-lighter hover:ring-surface-hover hover:ring-2"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: a.color }} />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Text Scaling Section */}
      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-text">Text Scaling</h3>
        <div className="flex flex-col gap-4 bg-window p-3 rounded-md border border-border">
          {/* Scaling Factor */}
          <div className="flex items-center gap-4">
            <label className="text-sm text-text w-28">Scaling Factor</label>
            <div className="inline-flex rounded-md overflow-hidden border border-border">
              <Button
                color="surface"
                onClick={() =>
                  themeService.applyTextScaling(Math.max(0.1, +(textScaling - 0.1).toFixed(1)))
                }
                className="px-3 py-1 text-text"
              >
                -
              </Button>
              <input
                type="number"
                step={0.1}
                min={0.1}
                value={textScaling}
                onChange={(e) => {
                  const val = parseFloat(e.target.value)
                  if (!isNaN(val) && val >= 0.1) {
                    themeService.applyTextScaling(+val.toFixed(1))
                  }
                }}
                className="w-20 text-center bg-shell text-text border-l border-r border-border focus:outline-none"
              />
              <Button
                color="surface"
                onClick={() => themeService.applyTextScaling(+(textScaling + 0.1).toFixed(1))}
                className="px-3 py-1 text-text"
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
