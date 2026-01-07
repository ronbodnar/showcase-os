import { useState, useEffect, useRef } from "react"
import { themeService } from "@features/theme/services/themeService"
import { useSettingsStore } from "@core/store/useSettingsStore"
import { osService } from "@core/services/osService"

export function BootScreen() {
  const [messages, setMessages] = useState<string[]>([])

  const hasRun = useRef(false)
  const themeName = useSettingsStore((state) => state.themeName)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    async function boot() {
      await step("Initializing Showcase OS...")
      await step(`Detected device platform: ${osService.getPlatform()}`)
      await step(`Loading theme "${themeName}"...`, () => themeService.initializeTheme())
      await step("Loading theme icons...", () => themeService.loadIcons())
      await step("Preloading assets...", () => themeService.preloadAssets())
      await step("Boot complete!")
      await new Promise((resolve) =>
        setTimeout(() => resolve(osService.setStatus("unlocked")), 500),
      )
    }

    async function step(message: string, fn?: () => Promise<void>) {
      setMessages((prev) => [...prev, message])
      const start = Date.now()
      if (fn) {
        await fn()
      }
      const elapsed = Date.now() - start
      await new Promise((resolve) => setTimeout(resolve, Math.max(0, 250 - elapsed)))
    }

    boot()
  }, [themeName])

  return (
    <div className="h-screen w-screen backdrop-blur-sm bg-neutral-950 text-stone-200 font-mono p-4 text-[14px]">
      {messages.map((msg, i) => (
        <span key={i}>
          {msg}
          <br />
        </span>
      ))}
    </div>
  )
}
