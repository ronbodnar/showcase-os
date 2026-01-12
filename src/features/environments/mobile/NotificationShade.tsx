import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  DragControls,
  PanInfo,
} from "framer-motion"
import { useEffect, useState } from "react"
import { systemService } from "@core/services/systemService"
import { getLauncherMeta } from "@features/launcher/registry"
import { Button } from "@shared/components/Button"
import Icon from "@shared/components/Icon"
import { useSystemClock } from "@shared/hooks/useSystemClock"
import { launcherService } from "@features/launcher/services/launcherService"

export function NotificationShade({ controls }: { controls: DragControls }) {
  const [isOpen, setIsOpen] = useState(false)
  const [screenHeight, setScreenHeight] = useState(800)

  const { date } = useSystemClock({
    dateOptions: { weekday: "short", month: "short", day: "numeric" },
  })

  useEffect(() => {
    if (typeof window !== "undefined") setScreenHeight(window.innerHeight)
  }, [])

  const y = useMotionValue(0)
  const ySpring = useSpring(y, { stiffness: 300, damping: 40 })

  const opacity = useTransform(ySpring, [0, screenHeight * 0.5], [0, 1])
  const translateY = useTransform(ySpring, [0, screenHeight], [-10, 1])
  const scale = useTransform(ySpring, [0, screenHeight], [0.98, 1])

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isOpen) {
      if (info.offset.y > 20) {
        setIsOpen(true)
      }
      return
    }

    const dragY = Math.max(0, Math.min(info.point.y, screenHeight))
    y.set(dragY)
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const shouldOpen = info.offset.y > 60 || info.velocity.y > 300
    const shouldClose = info.offset.y < -60 || info.velocity.y < -300

    const OPEN_HEIGHT = screenHeight * 0.85
    let target = y.get()

    if (shouldOpen) target = OPEN_HEIGHT
    else if (shouldClose) target = 0

    if (shouldClose) setIsOpen(false)

    animate(y, target, {
      type: "spring",
      stiffness: 260,
      damping: 35,
    })
  }

  return (
    <motion.section
      drag="y"
      dragConstraints={{ top: 0, bottom: screenHeight }}
      dragElastic={0.2}
      dragControls={controls}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 z-40 flex flex-col justify-start"
      style={{
        opacity,
        y: translateY,
        scale,
        willChange: "transform, opacity, scale",
        pointerEvents: isOpen ? "auto" : "none",
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="flex flex-col w-full h-full p-3 gap-2 mt-7 mb-12 text-white text-xs">
        <div className="flex justify-between w-full">
          <h1 className="text-lg font-semibold">{date}</h1>

          <div className="flex items-center justify-center gap-3">
            <Button onClick={() => systemService.promptShutdown()}>
              <Icon name="PowerOff" className="w-6 h-6" />
            </Button>

            <Button
              onClick={() => {
                launcherService.openLauncher(getLauncherMeta("system_settings"))
                y.set(0)
                setIsOpen(false)
              }}
            >
              <Icon name="Settings" className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="flex flex-1 w-full flex-col justify-center items-center">
          <div className="flex flex-col items-center gap-4 opacity-40">
            <Icon name="Bell" className="w-12 h-12 stroke-[1px]" />
            <div className="text-center">
              <p className="text-sm font-semibold tracking-wide">NO NOTIFICATIONS</p>
              <p className="text-[10px]">System notifications will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
