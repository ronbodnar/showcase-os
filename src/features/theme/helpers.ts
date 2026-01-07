import { SVGProps } from "react"
import { wallpaperModules } from "./assets/wallpaper"

export function makeIcon(src: string | React.FC<SVGProps<SVGSVGElement>>, title?: string) {
  return {
    src,
    title,
  }
}

export function makeWallpaper(name: string, basePath: string, subdirName: string) {
  return {
    name,
    loaders: {
      "desktop-ultrawide": wallpaperModules[basePath + subdirName + "/desktop-ultrawide.webp"],
      "desktop-4k": wallpaperModules[basePath + subdirName + "/desktop-4k.webp"],
      "desktop-1440p": wallpaperModules[basePath + subdirName + "/desktop-1440p.webp"],
      "desktop-1080p": wallpaperModules[basePath + subdirName + "/desktop-1080p.webp"],
      "mobile-1440p": wallpaperModules[basePath + subdirName + "/mobile-1440p.webp"],
      "mobile-1080p": wallpaperModules[basePath + subdirName + "/mobile-1080p.webp"],
      "thumbnail": wallpaperModules[basePath + subdirName + "/thumbnail.webp"],
    },
  }
}

export async function preloadImages(assets: string[]): Promise<void> {
  await Promise.all(
    assets.map(
      (src) =>
        new Promise<void>((resolve, reject) => {
          const img = new Image()
          img.src = src
          img.onload = () => resolve()
          img.onerror = reject
          if (img.decode) {
            img.decode().catch(() => resolve()) // decode errors shouldn’t block boot
          }
        }),
    ),
  )
}
