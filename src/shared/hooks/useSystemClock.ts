import { useState, useEffect } from "react"

interface UseSystemClockOptions {
  timeOptions?: Intl.DateTimeFormatOptions
  dateOptions?: Intl.DateTimeFormatOptions
  locale?: string
}

export const useSystemClock = ({
  timeOptions,
  dateOptions,
  locale = undefined,
}: UseSystemClockOptions = {}) => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const time = now.toLocaleTimeString(locale, timeOptions)
  const date = now.toLocaleDateString(locale, dateOptions)

  return { time, date, now }
}
