import { useEffect, useState } from "react"
import { Theme } from "../types"
import { debugMessage } from "@shared/utils/utils"

export function useWallpaperThumbs(theme: Theme | undefined) {
  const [thumbs, setThumbs] = useState<Record<string, string>>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false

    const wallpapers = theme?.wallpaperOptions ?? []

    async function loadThumbs() {
      const thumbs: Record<string, string> = {}
      for (const wallpaper of wallpapers) {
        const loader = wallpaper.loaders["thumbnail"]
        if (!loader) {
          debugMessage("No loader found for wallpaper", wallpaper)
          continue
        }
        const thumb = await loader()
        if (cancelled) {
          return
        }
        thumbs[wallpaper.name] = thumb.default
      }
      setThumbs(thumbs)
      setLoaded(true)
    }

    loadThumbs()

    return () => {
      cancelled = true
      setLoaded(false)
    }
  }, [theme])

  return { thumbs, loaded }
}
