import { useState, useEffect, useCallback, useRef } from "react"

export function useCarousel(length: number, autoPlay = true, autoPlayInterval = 5000) {
  const [index, setIndex] = useState(0)

  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const next = useCallback(() => setIndex((prev) => (prev + 1) % length), [length])
  const prev = useCallback(() => setIndex((prev) => (prev - 1 + length) % length), [length])

  useEffect(() => {
    if (!autoPlay || length <= 1) {
      return
    }
    const interval = setInterval(next, autoPlayInterval)
    return () => clearInterval(interval)
  }, [next, autoPlay, autoPlayInterval, length])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) {
      return
    }

    const delta = touchStartX.current - touchEndX.current
    if (delta > 50) {
      next()
    } else if (delta < -50) {
      prev()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return { index, setIndex, next, prev, handleTouchStart, handleTouchMove, handleTouchEnd }
}
