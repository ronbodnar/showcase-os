import { programService } from "@features/program/services/programService"
import {
  useAppStackStore,
  getActiveCard,
  popNavigationStack,
  setActiveCard,
  hideActiveCard,
  hasOpenCard,
} from "@core/store/useAppStackStore"
import { getLauncherMeta } from "@features/launcher/registry"
import { IconName } from "@features/theme/types"
import { Button } from "@shared/components/button/Button"
import Icon from "@shared/components/icon/Icon"
import { useEffect } from "react"
import { launcherService } from "@features/launcher/services/launcherService"

export function NavigationControls() {
  const activeCard = useAppStackStore((state) => state.activeCard)

  const controls: Array<{ name: string; icon: IconName; onClick: () => void; disabled?: boolean }> =
    [
      { name: "appStack", icon: "AppStack", onClick: () => {}, disabled: true },
      { name: "home", icon: activeCard ? "Home" : "Apps", onClick: () => onHome() },
      { name: "back", icon: "ChevronLeft", onClick: () => onBack() },
    ]

  function onBack() {
    const activeCard = getActiveCard()
    if (!activeCard) {
      return
    }

    const navigation = programService.getNavigationHandler(activeCard?.id)
    if (navigation?.canGoBack()) {
      navigation.goBack()
      return
    }

    const lastAppCard = popNavigationStack()
    if (lastAppCard) {
      setActiveCard(lastAppCard, true)
      return
    }

    hideActiveCard()
  }

  function onHome() {
    if (hasOpenCard()) {
      hideActiveCard()
    } else {
      launcherService.openLauncher(getLauncherMeta("app_drawer"))
    }
  }

  useEffect(() => {
    window.addEventListener("popstate", onBack)
    return () => window.removeEventListener("popstate", onBack)
  }, [])

  return (
    <div
      className={`flex justify-evenly items-center w-full h-12 transition-all ${activeCard ? "shadow-[0_-2px_10px_rgba(0,0,0,0.3)] bg-shell" : "transparent"}`}
    >
      {controls.map(({ name, icon, disabled, onClick }) => (
        <Button
          key={name}
          className="w-15 h-full rounded-xl"
          whileTap={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
          onClick={onClick}
          disabled={disabled}
        >
          <Icon name={icon} className={`${activeCard ? "text-text" : "text-stone-200"} w-7 h-7`} />
        </Button>
      ))}
    </div>
  )
}
