import { useEffect, lazy, Suspense } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Shutdown } from "./Shutdown"
import { BootScreen } from "./BootScreen"
import { LockScreen } from "./LockScreen"
import { Loading } from "./Loading"
import { osService } from "@core/services/osService"
import { useOSStore } from "@core/store/useOSStore"
import { useMediaQuery } from "@shared/hooks/useMediaQuery"
import { processService } from "@core/services/processService"
import { windowService } from "@features/window/services/windowService"
import { debugMessage } from "@shared/utils/utils"

const MobileEnvironment = lazy(() => import("../../environments/mobile/MobileEnvironment"))
const DesktopEnvironment = lazy(
  () => import("../../environments/desktop/components/DesktopEnvironment"),
)

export function OperatingSystemRoot() {
  const status = useOSStore((s) => s.status)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  debugMessage("Loading Operating System Root", status, isDesktop)

  useEffect(() => {
    const platform = osService.getPlatform()
    osService.setPlatform(isDesktop ? "desktop" : "mobile")
    if (osService.getPlatform() !== platform) {
      windowService.closeAllWindows()
      processService.stopAllProcesses()
      osService.setStatus("booting")
    }
  }, [isDesktop])

  const UIEnvironment = isDesktop ? DesktopEnvironment : MobileEnvironment

  return (
    <div
      className={`fixed inset-0 flex flex-col h-screen w-screen wallpaper transition-all duration-600`}
    >
      <Suspense fallback={<Loading />}>
        <AnimatePresence mode="wait">
          {status === "shutdown" && withMotion(<Shutdown />, "shutdown")}
          {status === "booting" && withMotion(<BootScreen />, "booting")}
          {status === "locked" && withMotion(<LockScreen />, "locked")}
          {status === "unlocked" && withMotion(<UIEnvironment />, "unlocked")}
        </AnimatePresence>
      </Suspense>
    </div>
  )
}

function withMotion(children: React.ReactNode, key: string, transitionDelay: number = 0.4) {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: transitionDelay }}
      className={"w-full h-full flex-1"}
    >
      {children}
    </motion.div>
  )
}
