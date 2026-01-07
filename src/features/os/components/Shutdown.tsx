import { useEffect, useRef, useState } from "react"
import { osService } from "@core/services/osService"
import { useOSStore } from "@core/store/useOSStore"

export const Shutdown = () => {
  const boxRef = useRef<HTMLDivElement>(null)
  const isDesktop = useOSStore((state) => state.platform === "desktop")

  const position = useRef({ x: 0, y: 0 })
  const velocity = useRef({ vx: 0, vy: 0 })

  const [, setTick] = useState(0)

  useEffect(() => {
    velocity.current = { vx: isDesktop ? 0.45 : 0.15, vy: 0.45 }
  }, [isDesktop])

  useEffect(() => {
    const animate = () => {
      if (!boxRef.current) return

      const { width = 0, height = 0 } = boxRef.current.getBoundingClientRect()
      const { x, y } = position.current
      let { vx, vy } = velocity.current

      let nextX = x + vx
      let nextY = y + vy

      // Bounce horizontally
      if (nextX < 0) {
        nextX = 0
        vx = -vx
      } else if (nextX + width > window.innerWidth) {
        nextX = window.innerWidth - width
        vx = -vx
      }

      // Bounce vertically
      if (nextY < 0) {
        nextY = 0
        vy = -vy
      } else if (nextY + height > window.innerHeight) {
        nextY = window.innerHeight - height
        vy = -vy
      }

      position.current = { x: nextX, y: nextY }
      velocity.current = { vx, vy }

      setTick((t) => t + 1)

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [])

  const boot = () => osService.setStatus("booting")

  useEffect(() => {
    window.addEventListener("keyup", boot)
    return () => window.removeEventListener("keyup", boot)
  })

  return (
    <div className="h-screen w-screen bg-neutral-950 text-white overflow-hidden" onClick={boot}>
      <div
        ref={boxRef}
        className="absolute flex flex-col items-center gap-5 p-10 border border-stone-800 bg-neutral-900 rounded-md"
        style={{
          top: position.current.y,
          left: position.current.x,
        }}
      >
        <span>System is powered off</span>
        <span className="text-sm">
          {isDesktop ? "Click anywhere or press any key" : "Tap anywhere"} to power on
        </span>
      </div>
    </div>
  )
}
