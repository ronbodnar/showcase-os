import { config } from "@config/config"
import { ContextMenuProps } from "@core/overlays/components/ContextMenu"
import { overlayService } from "@core/services/overlayService"
import { GridContainer } from "@features/grid/components/GridContainer"
import { getLauncherMeta } from "@features/launcher/registry"
import { useLauncherStore } from "@features/launcher/store/useLauncherStore"
import { debugMessage } from "@shared/utils/utils"

export function DesktopGrid() {
  const launchers = useLauncherStore((state) => state.launchersByGrid["home"]) || []

  debugMessage("Rendering DesktopGrid", launchers)

  const handleContextMenu = (e: React.MouseEvent) => {
    const contextMenuProps: ContextMenuProps = {
      variant: "default",
      position: { x: e.clientX, y: e.clientY },
      menuItems: [
        {
          icon: "Refresh",
          label: "Reset Desktop",
          meta: { target: { type: "action", action: "resetHomeScreen" } },
        },
        {
          meta: getLauncherMeta("system_settings"),
        },
        {
          icon: "TerminalSymbolic",
          label: "Open in Terminal",
          meta: getLauncherMeta("terminal"),
        },
      ],
    }

    overlayService.showOverlay("contextMenu", contextMenuProps)
  }

  return (
    <GridContainer
      id="home"
      iconSize={config.grids.desktopIconSize}
      launchers={launchers}
      showGridLines={false}
      isGridResponsive={true}
      onContextMenu={handleContextMenu}
    />
  )
}
