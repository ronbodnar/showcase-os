import { overlayService } from "@core/services/overlayService"
import { IconName } from "@features/theme/types"
import { Button } from "@shared/components/button/Button"
import Icon from "@shared/components/icon/Icon"
import { debugMessage } from "@shared/utils/utils"
import { useRef } from "react"
import { XYCoordinate } from "types"

interface BrowserToolbarProps {
  url: string
  onBack: () => void
  onForward: () => void
  onHome: () => void
  onRefresh: () => void
  canBack: boolean
  canForward: boolean
}

export function BrowserToolbar({
  url,
  onBack,
  onForward,
  onHome,
  onRefresh,
  canBack,
  canForward,
}: BrowserToolbarProps) {
  return (
    <div className="w-full flex items-center p-1 gap-2">
      <NavigationPane
        onBack={onBack}
        onForward={onForward}
        onHome={onHome}
        onRefresh={onRefresh}
        canBack={canBack}
        canForward={canForward}
      />
      <AddressBar url={url} />

      <ActionButtonPane url={url} />
    </div>
  )
}

function NavigationPane({
  onBack,
  onForward,
  onHome,
  onRefresh,
  canBack,
  canForward,
}: Omit<BrowserToolbarProps, "url">) {
  const navigationButtons: { name: IconName; onClick: () => void; disabled?: boolean }[] = [
    { name: "ChevronLeft", onClick: onBack, disabled: !canBack },
    { name: "ChevronRight", onClick: onForward, disabled: !canForward },
    { name: "Refresh", onClick: onRefresh },
    { name: "Home", onClick: onHome },
  ]
  return (
    <div className="flex items-center gap-2">
      {navigationButtons.map((b) => (
        <Button
          className="p-1 hover:bg-window rounded-md"
          key={b.name}
          onClick={b.onClick}
          disabled={b.disabled}
        >
          <Icon name={b.name} className="w-5 h-5 text-text" />
        </Button>
      ))}
    </div>
  )
}

function AddressBar({ url }: { url: string }) {
  return (
    <div className="flex flex-1 items-center gap-2">
      <input
        type="text"
        className="w-full p-1 bg-window text-sm rounded-lg opacity-60 text-muted cursor-not-allowed"
        value={url}
        disabled
      />
    </div>
  )
}

function ActionButtonPane({ url }: { url: string }) {
  const mousePosition = useRef<XYCoordinate>({ x: 0, y: 0 })

  const actionButtons: { name: IconName; onClick: () => void }[] = [
    { name: "Share", onClick: handleShare },
    { name: "OpenInNew", onClick: () => window.open(url, "_blank") },
  ]

  function copyToClipboard() {
    overlayService.showOverlay("tooltip", {
      text: "URL Copied to Clipboard",
      position: { x: mousePosition.current.x, y: mousePosition.current.y - 20 },
    })
    navigator.clipboard.writeText(url)
    setTimeout(() => {
      overlayService.hideOverlay()
    }, 3000)
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Showcase OS",
          text: "Check this software out!",
          url: url,
        })
      } catch (err) {
        debugMessage("Share cancelled or failed", err)
      }
    } else {
      copyToClipboard()
    }
  }

  return (
    <div className="flex items-center gap-2">
      {actionButtons.map((b) => (
        <Button
          className="p-1 hover:bg-window rounded-md"
          key={b.name}
          onClick={b.onClick}
          onMouseEnter={(e) => (mousePosition.current = { x: e.clientX, y: e.clientY })}
        >
          <Icon name={b.name} className="w-5 h-5 text-text" />
        </Button>
      ))}
    </div>
  )
}
