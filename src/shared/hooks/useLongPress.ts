import { useRef, useCallback } from "react"

interface UseLongPressOptions {
  onLongPress: (event: React.PointerEvent) => void
  onTap?: (event: React.PointerEvent) => void
  delay?: number
  disabled?: boolean
}

export function useLongPress({
  onLongPress,
  onTap,
  delay = 600,
  disabled = false,
}: UseLongPressOptions) {
  const timeoutRef = useRef<number | null>(null)
  const pointerDownTime = useRef<number>(0)
  const moved = useRef<boolean>(false)

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return
      if (e.pointerType !== "touch") return
      moved.current = false
      pointerDownTime.current = e.timeStamp

      timeoutRef.current = window.setTimeout(() => {
        onLongPress(e)
        clear()
      }, delay)
    },
    [delay, onLongPress, disabled, clear],
  )

  const onPointerMove = useCallback(() => {
    moved.current = true
    clear()
  }, [clear])

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return
      if (e.pointerType !== "touch") return
      const pressDuration = e.timeStamp - pointerDownTime.current
      clear()

      if (!moved.current && pressDuration < delay) {
        onTap?.(e)
      }
    },
    [onTap, clear, disabled, delay],
  )

  return {
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      clear,
    },
  }
}
