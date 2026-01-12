import { overlayService } from "@core/services/overlayService"
import { executeAction } from "@features/os/actions/systemRegistry"
import { ButtonColor, Button } from "@shared/components/Button"

export interface DialogButtonOption {
  label: string
  color?: ButtonColor
  action?: () => void
}

export function ShutdownDialog() {
  const options: Record<string, DialogButtonOption> = {
    cancel: {
      label: "Cancel",
    },
    restart: {
      label: "Restart",
      action: () => setTimeout(() => executeAction("reboot"), 250),
    },
    shutdown: {
      color: "danger",
      label: "Shut Down",
      action: () => setTimeout(() => executeAction("shutdown"), 250),
    },
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 my-5 mb-0">
      {Object.keys(options).map((key) => {
        const option = options[key]
        return (
          <Button
            key={key}
            color={option.color ?? "surface-accent"}
            onClick={() => {
              option.action?.()
              overlayService.hideOverlay()
            }}
            className="px-10 py-2 text-white font-semibold text-sm rounded-2xl border border-border-lighter"
          >
            {option.label}
          </Button>
        )
      })}
    </div>
  )
}
