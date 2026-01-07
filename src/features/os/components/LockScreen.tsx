import { useEffect } from "react"
import { motion, PanInfo } from "motion/react"
import { osService } from "@core/services/osService"
import { useSystemClock } from "@shared/hooks/useSystemClock"

export function LockScreen() {
  const { time, date } = useSystemClock({
    timeOptions: { hour: "numeric", minute: "2-digit" },
    dateOptions: { weekday: "long", month: "long", day: "numeric" },
  })

  const isMobile = osService.isMobile()

  useEffect(() => {
    const handleKeyUp = () => osService.setStatus("unlocked")
    window.addEventListener("keyup", handleKeyUp)
    return () => window.removeEventListener("keyup", handleKeyUp)
  })

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 10 || Math.abs(info.offset.y) > 10) {
      osService.setStatus("unlocked")
    }
  }

  return (
    <main className="relative h-screen w-screen flex justify-center items-center">
      <motion.div
        className="absolute top-0 left-0 h-screen w-screen"
        onClick={() => osService.setStatus("unlocked")}
        drag
        onDrag={handleDrag}
        dragMomentum={false}
        whileDrag={{ opacity: 0.8 }}
      />

      <div className="w-3/4 h-3/4 flex flex-col items-start justify-start lg:justify-center text-text text-shadow-2xs text-shadow-black">
        <span className="text-6xl">{time}</span>
        <span className="text-xl">{date}</span>
        <span className="text-xs mt-2">
          {isMobile ? "Tap or swipe" : "Click anywhere or press any key"} to unlock
        </span>
      </div>
    </main>
  )
}
