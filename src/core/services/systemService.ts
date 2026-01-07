import { ShutdownDialog } from "@core/overlays/components/dialogs/Shutdown"
import { useProcessStore } from "@core/store/useProcessStore"
import { useDesktopStore } from "@features/environments/desktop/store/useDesktopStore"
import { useLauncherStore } from "@features/launcher/store/useLauncherStore"
import { executeAction } from "@features/os/actions/systemRegistry"
import { useWindowStore } from "@features/window/store/useWindowStore"
import { osService } from "./osService"
import { overlayService } from "./overlayService"

export const systemService = {
  lockScreen: () => {
    osService.setStatus("locked")
  },
  promptShutdown: () => {
    overlayService.showDialog({
      title: "Shut Down",
      content: ShutdownDialog,
    })
  },
  reboot: () => {
    executeAction("shutdown")
    setTimeout(() => {
      osService.setStatus("booting")
      overlayService.hideOverlay()
    }, 2500)
  },
  shutdown: () => {
    overlayService.hideOverlay()
    useWindowStore.getState().reset()
    useDesktopStore.getState().reset()
    useProcessStore.getState().reset()
    osService.setStatus("shutdown")
  },
  resetHomeScreen: () => {
    useLauncherStore.getState().resetLaunchers("home")
  },
  toggleShowDesktop: () => {
    const { isShowingDesktop, setShowingDesktop } = useDesktopStore.getState()
    const { hideAllWindows, unhideAllWindows } = useWindowStore.getState()

    if (isShowingDesktop) {
      unhideAllWindows()
      setShowingDesktop(false)
    } else {
      hideAllWindows()
      setShowingDesktop(true)
    }
  },
}
