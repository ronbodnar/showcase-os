import { memo, useEffect, useRef, useState } from "react"
import { BrowserToolbar } from "./BrowserToolbar"
import { debugMessage } from "@shared/utils/utils"
import { useTheme } from "@features/theme/hooks/useTheme"
import { BrowserStartPage } from "./BrowserStartPage"
import { useOSStore } from "@core/store/useOSStore"
import { useAppStackStore } from "@core/store/useAppStackStore"
import { useWindowStore } from "@features/window/store/useWindowStore"

export interface BrowserProps {
  displayId: string
  url: string
}

export const HOME_URI = "home://"

export const Browser = memo(function Browser({ displayId, url: initialUrl }: BrowserProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const [history, setHistory] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentUrl, setCurrentUrl] = useState(initialUrl ?? HOME_URI)

  const isDesktop = useOSStore((state) => state.platform === "desktop")
  const setTitle = isDesktop
    ? useWindowStore.getState().setTitle
    : useAppStackStore.getState().setTitle

  const { scheme: themeColorScheme } = useTheme()

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      debugMessage("Browser message received:", event)
      if (!currentUrl.startsWith(event.origin)) {
        debugMessage(
          "Browser origin is from a different domain. Event origin:",
          event.origin,
          "Initial URL:",
          currentUrl,
        )
        return
      }
      if (event.data?.type === "nav_change") {
        const newUrl = event.data.url
        const newTitle = event.data.title

        // If any SPAs do not support routing, they can be added here.
        const skipRouting = newUrl.startsWith("https://play.ronbodnar.com/")

        if (!skipRouting) {
          setHistory((prev) => {
            // If we are navigating to a new page while in the middle of history, clear the "forward" history
            const newStack = prev.slice(0, currentIndex + 1)

            if (newStack[newStack.length - 1] === newUrl) return prev

            const updatedStack = [...newStack, newUrl]
            setCurrentIndex(updatedStack.length - 1)
            return updatedStack
          })
          setCurrentUrl(newUrl)
        }

        if (newTitle) {
          setTitle(displayId, newTitle)
        }
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [currentIndex, history, currentUrl, displayId, setTitle])

  function goBack() {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      const prevUrl = history[prevIndex]
      setCurrentIndex(prevIndex)
      setCurrentUrl(prevUrl)
      if (iframeRef.current && prevUrl !== HOME_URI) {
        iframeRef.current.src = prevUrl
      }
    }
  }

  function goForward() {
    if (currentIndex < history.length - 1) {
      const nextIndex = currentIndex + 1
      const nextUrl = history[nextIndex]
      setCurrentIndex(nextIndex)
      setCurrentUrl(nextUrl)

      if (iframeRef.current && nextUrl !== HOME_URI) {
        iframeRef.current.src = nextUrl
      }
    }
  }

  function goHome() {
    navigateTo(HOME_URI)
    setTitle(displayId, "Browser Start Page")
  }

  function refresh() {
    // Just "blink" the home page to show it refreshed
    if (isHomePage) {
      setCurrentUrl("")
      setTimeout(() => setCurrentUrl(HOME_URI), 10)
      return
    }

    // Re-assigning the src forces the iframe to reload the document
    if (iframeRef.current) {
      iframeRef.current.src = currentUrl
    }
  }

  function navigateTo(url: string) {
    setHistory((prev) => [...prev.slice(0, currentIndex + 1), url])
    setCurrentIndex((prev) => prev + 1)
    setCurrentUrl(url)

    if (iframeRef.current && url !== HOME_URI) {
      iframeRef.current.src = url
    }
  }

  const isHomePage = currentUrl === undefined || currentUrl === HOME_URI

  return (
    <div className="flex flex-col w-full h-full bg-surface">
      <BrowserToolbar
        url={currentUrl}
        onBack={goBack}
        onForward={goForward}
        onHome={goHome}
        onRefresh={refresh}
        canBack={currentIndex > 0}
        canForward={currentIndex < history.length - 1}
      />

      <div className="flex-1 relative">
        {isHomePage && (
          <div className="absolute inset-0 z-10">
            <BrowserStartPage onLaunchApp={(url) => navigateTo(url)} />
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={initialUrl !== HOME_URI ? initialUrl : undefined}
          className={`w-full h-full bg-surface transition-opacity duration-300 ${
            isHomePage ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ colorScheme: themeColorScheme }}
        />
      </div>
    </div>
  )
})

export default Browser
