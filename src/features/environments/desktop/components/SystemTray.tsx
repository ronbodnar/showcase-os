import { overlayService } from "@core/services/overlayService"
import { useTheme } from "@features/theme/hooks/useTheme"
import { IconName } from "@features/theme/types"
import { Button } from "@shared/components/Button"
import Icon from "@shared/components/Icon"
import { useSystemClock } from "@shared/hooks/useSystemClock"

const SYSTEM_TRAY_ICON_NAMES: IconName[] = [
  "Dropbox",
  "Bluetooth",
  "HighSecurity",
  "RemovableMedia",
  "NetworkWired",
  "Volume",
  "Battery",
]

export function SystemTray() {
  const theme = useTheme()

  const { time, date } = useSystemClock({
    timeOptions: { hour: "numeric", minute: "2-digit" },
    dateOptions: { month: "2-digit", day: "numeric", year: "numeric" },
  })

  const { time: timeTooltip, date: dateTooltip } = useSystemClock({
    timeOptions: { hour: "numeric", minute: "2-digit" },
    dateOptions: { weekday: "long", month: "long", day: "numeric" },
  })

  const getTooltip = (icon: IconName) => theme.icons[icon]?.title ?? icon

  return (
    <div className="flex items-stretch justify-center" onContextMenu={(e) => e.stopPropagation()}>
      {SYSTEM_TRAY_ICON_NAMES.map((icon, i) => (
        <Button
          key={"system-tray-button-" + i}
          color="shell"
          className="w-7 h-full flex items-center justify-center"
          onMouseEnter={(e) =>
            overlayService.showOverlayWithDelay(e, "tooltip", { text: getTooltip(icon) })
          }
          onMouseLeave={() => overlayService.hideOverlayIfType("tooltip")}
        >
          <Icon name={icon} className="w-4 h-4 text-text" />
        </Button>
      ))}

      {/* System clock */}
      <div
        className="h-full flex items-center text-sm px-1 text-text hover:bg-surface-alt"
        onMouseEnter={(e) =>
          overlayService.showOverlayWithDelay(e, "tooltip", {
            text: `${dateTooltip}, ${timeTooltip}`,
          })
        }
        onMouseLeave={() => overlayService.hideOverlayIfType("tooltip")}
      >
        <span>
          {date} {time}
        </span>
      </div>
    </div>
  )
}
