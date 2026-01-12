import { memo } from "react"
import { SystemTray } from "./SystemTray"
import { ContextMenuProps } from "@core/overlays/components/ContextMenu"
import { overlayService } from "@core/services/overlayService"
import { systemService } from "@core/services/systemService"
import { GridContainer } from "@features/grid/components/GridContainer"
import { useGridStore } from "@features/grid/store/useGridStore"
import { getLauncherMeta } from "@features/launcher/registry"
import { useLauncherStore } from "@features/launcher/store/useLauncherStore"
import { config } from "@config/config"

export const Panel = memo(function Panel() {
  const launchers = useLauncherStore((state) => state.launchersByGrid["panel"]) ?? []
  const panelPositionY = useGridStore((state) => state.grids["panel"]?.position?.y) ?? 0
  const iconSize = config.grids.panelIconSize

  const handleContextMenu = (e: React.MouseEvent) => {
    const contextMenuProps: ContextMenuProps = {
      variant: "panel",
      position: { x: e.clientX, y: panelPositionY },
      menuItems: [
        {
          meta: getLauncherMeta("system_settings"),
          iconSize: 18,
        },
      ],
    }

    overlayService.showOverlay("contextMenu", contextMenuProps)
  }

  return (
    <section
      className={`w-full flex items-stretch justify-between`}
      style={{ height: iconSize + 1 }}
      onContextMenu={handleContextMenu}
    >
      <div className="flex items-center gap-2"></div>

      <div className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
        <GridContainer
          id="panel"
          numRows={1}
          numCols={launchers.length}
          colGap={5}
          layoutDirection="horizontal"
          iconSize={iconSize}
          launchers={launchers}
          showGridLines={false}
        />
      </div>

      <div className="flex items-stretch ml-auto">
        <SystemTray />
        <ShowDesktop />
      </div>
    </section>
  )
})

function ShowDesktop() {
  return (
    <div
      className={`h-full flex flex-1 w-2 bg-surface-alt hover:bg-surface-hover`}
      onClick={() => systemService.toggleShowDesktop()}
      onMouseEnter={(e) =>
        overlayService.showOverlayWithDelay(e, "tooltip", { text: "Show the desktop" })
      }
      onMouseLeave={() => overlayService.hideOverlayIfType("tooltip")}
    ></div>
  )
}
