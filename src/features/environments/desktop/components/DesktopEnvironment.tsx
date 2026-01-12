import { useEffect, useRef } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { OverlayRoot } from "@core/overlays/components/OverlayRoot"
import { gridService } from "@features/grid/services/gridService"
import { overlayService } from "@core/services/overlayService"
import { GridDragLayer } from "@features/grid/components/GridDragLayer"
import { windowService } from "@features/window/services/windowService"
import { disableTextSelection } from "@shared/utils/ui.utils"
import { useDesktopStore } from "../store/useDesktopStore"
import { DesktopGrid } from "./DesktopGrid"
import { Panel } from "./Panel"
import { WindowRenderer } from "./WindowRenderer"
import { debugMessage } from "@shared/utils/utils"
import { processService } from "@core/services/processService"
import { getLauncherMeta } from "@features/launcher/registry"

export default function DesktopEnvironment() {
  debugMessage("Rendering DesktopEnvironment", performance.now())
  const loaded = useRef<boolean>(false)

  useEffect(() => {
    if (loaded.current) return
    gridService.initializeLaunchers()
    processService.startProcess(getLauncherMeta("start_menu"), true)

    loaded.current = true
    disableTextSelection()
  }, [loaded])

  useEffect(() => {
    const handlePointerUp = (e: MouseEvent) => {
      if (e.button === 2) {
        return
      }
      debugMessage("Global Pointer Up Event", e)
      setTimeout(() => overlayService.hideOverlay(), 10)
      useDesktopStore.getState().clearSelectedLaunchers()
    }

    const handlePointerDown = (e: MouseEvent) => {
      if (e.button === 2) {
        return
      }
      windowService.tryCloseEphemeralWindow({ x: e.clientX, y: e.clientY })
    }

    const handleContextMenu = (e: MouseEvent) => e.preventDefault()

    window.addEventListener("pointerup", handlePointerUp)
    window.addEventListener("pointerdown", handlePointerDown)
    window.addEventListener("contextmenu", handleContextMenu, { capture: true })
    return () => {
      window.removeEventListener("pointerup", handlePointerUp)
      window.removeEventListener("pointerdown", handlePointerDown)
      window.removeEventListener("contextmenu", handleContextMenu, { capture: true })
    }
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <GridDragLayer size={72} />
      <DesktopLayout />
      <OverlayRoot />
    </DndProvider>
  )
}

function DesktopLayout() {
  return (
    <div className="flex flex-col flex-1 w-full h-full">
      <div className="flex-1 min-h-0 overflow-hidden">
        <DesktopGrid />
      </div>

      <div className="bg-shell z-100">
        <Panel />
      </div>

      <WindowRenderer />
    </div>
  )
}
