import { processService } from "@core/services/processService"
import { useAppStackStore } from "@core/store/useAppStackStore"
import { getProgramMeta } from "@features/program/registry"
import { useTheme } from "@features/theme/hooks/useTheme"
import { IconName } from "@features/theme/types"
import Icon from "@shared/components/icon/Icon"
import { useSystemClock } from "@shared/hooks/useSystemClock"
import { useDragControls } from "motion/react"
import { NotificationShade } from "./NotificationShade"

export function NotificationBar() {
  const SYSTEM_TRAY_ICON_NAMES: IconName[] = ["Wifi", "FiveG", "MobileSignal"]
  const batteryPercent = 85

  const theme = useTheme()

  const dragControls = useDragControls()

  const activeAppCard = useAppStackStore((state) => state.activeCard)
  const programId = activeAppCard
    ? processService.getProcess(activeAppCard?.processId)?.programId
    : undefined
  const programMeta = programId ? getProgramMeta(programId) : undefined

  const textClass = activeAppCard ? "text-text" : "text-stone-200"
  const backgroundClass = activeAppCard ? "bg-text" : "bg-stone-200"
  const opacityBackgroundClass = activeAppCard ? "bg-text/50" : "bg-stone-200/50"

  return (
    <>
      <section
        className="fixed top-0 left-0 w-full h-10 flex justify-between items-center px-3 z-50 select-none text-[12px] md:text-[16px] transition-colors duration-500"
        onPointerDown={(event) => dragControls.start(event)}
        style={{ touchAction: "none" }}
      >
        <SystemClock textClass={textClass} />

        <section className="flex items-center gap-2">
          {SYSTEM_TRAY_ICON_NAMES.map((icon) => (
            <Icon key={icon} name={icon} className={`w-4 h-4 opacity-90 ${textClass}`} />
          ))}

          <div
            className={`relative w-7 h-3.5 rounded-full ${opacityBackgroundClass} overflow-hidden`}
          >
            <div
              className={`absolute inset-0 rounded-full ${backgroundClass} transition-all`}
              style={{ width: `${batteryPercent}%` }}
            />
            <div className="relative inset-0 flex items-center justify-center">
              <span
                className="font-semibold text-[0.75rem] leading-4"
                style={{
                  color:
                    (programMeta?.background?.color ?? activeAppCard)
                      ? theme.colors.window
                      : "rgba(0,0,0,0.9)",
                }}
              >
                {batteryPercent}
              </span>
            </div>
          </div>
        </section>
      </section>

      <NotificationShade controls={dragControls} />
    </>
  )
}

function SystemClock({ textClass }: { textClass?: string }) {
  const { time } = useSystemClock({
    timeOptions: { hour: "numeric", minute: "2-digit" },
  })

  return <h2 className={`font-semibold ${textClass}`}>{time}</h2>
}
