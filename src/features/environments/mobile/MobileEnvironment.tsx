import { useEffect } from "react"
import { AnimatePresence, motion } from "motion/react"
import { DndProvider } from "react-dnd"
import { TouchBackend } from "react-dnd-touch-backend"
import { OverlayRoot } from "@core/overlays/components/OverlayRoot"
import { gridService } from "@features/grid/services/gridService"
import { useAppStackStore } from "@core/store/useAppStackStore"
import { AppCardInstance } from "@features/app-card/components/AppCardInstance"
import { AppCardState } from "@features/app-card/types"
import { GridDragLayer } from "@features/grid/components/GridDragLayer"
import { disableTextSelection } from "@shared/utils/ui.utils"
import { HomeScreen } from "./HomeScreen"
import { NavigationControls } from "./NavigationControls"
import { NotificationBar } from "./NotificationBar"
import { debugMessage } from "@shared/utils/utils"
import { useSettingsStore } from "@core/store/useSettingsStore"
import { processService } from "@core/services/processService"
import { getLauncherMeta } from "@features/launcher/registry"
import { launcherService } from "@features/launcher/services/launcherService"

export default function MobileEnvironment() {
  const activeAppCard = useAppStackStore((state) => state.activeCard)

  debugMessage("Rendering MobileEnvironment", activeAppCard)

  useEffect(() => {
    gridService.initializeLaunchers()

    const showWelcome = useSettingsStore.getState().showWelcome
    const isShowingWelcome = processService.getRunningCountForProgramId("welcome") > 0
    if (showWelcome && !isShowingWelcome) {
      launcherService.openLauncher(getLauncherMeta("welcome"))
    }

    disableTextSelection()
  }, [])

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault()
    window.addEventListener("contextmenu", handleContextMenu)
    return () => window.removeEventListener("contextmenu", handleContextMenu)
  })

  return (
    <DndProvider backend={TouchBackend}>
      <GridDragLayer size={72} />
      <MobileLayout activeAppCard={activeAppCard} />
      <OverlayRoot />
    </DndProvider>
  )
}

function MobileLayout({ activeAppCard }: { activeAppCard: AppCardState | undefined }) {
  return (
    <div className="flex flex-col w-dvw h-dvh">
      <NotificationBar />

      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {!activeAppCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="w-full h-full py-15"
            >
              <HomeScreen key="home" />
            </motion.div>
          )}
          {activeAppCard && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.1 }}
              className="w-full h-full"
            >
              <AppCardInstance key={activeAppCard.id} id={activeAppCard.id} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <NavigationControls />
    </div>
  )
}
