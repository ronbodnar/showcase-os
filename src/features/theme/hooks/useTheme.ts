import { useEffect, useState } from "react"
import { Theme } from "../types"
import { Themes } from ".."
import { useSettingsStore } from "@core/store/useSettingsStore"

export const useTheme = () => {
  const themeName = useSettingsStore((state) => state.themeName)
  const [theme, setTheme] = useState<Theme>(Themes[themeName])

  useEffect(() => {
    setTheme(Themes[themeName])
  }, [themeName])

  return theme
}
