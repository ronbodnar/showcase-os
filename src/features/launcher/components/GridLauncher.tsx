import { overlayService } from "@core/services/overlayService"
import { GridId } from "@features/grid/types"
import Icon from "@shared/components/icon/Icon"
import { memo, useState } from "react"
import { useLauncherDrag } from "../hooks/useLauncherDrag"
import { useLauncherStatus } from "../hooks/useLauncherStatus"
import { useLauncherStore } from "../store/useLauncherStore"
import { LauncherProps, LauncherMetadata } from "../types"
import { getProgramMetaFromTarget, isExternalLauncher } from "../utils/launcher.utils"
import { LauncherLabel } from "./LauncherLabel"
import { MenuLauncherProps } from "./MenuLauncher"
import { debugMessage } from "@shared/utils/utils"
import { launcherService } from "../services/launcherService"

export const GridLauncher = memo(function GridLauncher({
  id,
  meta,
  gridId,
  iconSize,
  drawLabel = true,
  isDragPreview = false,
  className = "",
}: LauncherProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  debugMessage("Rendering GridLauncher", meta)

  const state = useLauncherStore((state) => (id ? state.launchersById[id] : undefined))

  const { icon, label, target, disabled } = meta ?? {}
  const { name, icon: programIcon } = getProgramMetaFromTarget(target) ?? {}

  const { isSelected } = useLauncherStatus(state)
  const { isDragging, dragRef } = useLauncherDrag({ id, meta, gridId, iconSize, isDragPreview })

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled) return
    launcherService.handleLauncherClick(e, meta, id, gridId)
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled) return
    launcherService.handleLauncherClick(e, meta, id, gridId)
  }

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    const menuItems = getContextMenuItems(id, meta, gridId)
    if (menuItems.length > 0) {
      debugMessage("Grid launcher context menu items", menuItems)
      overlayService.showOverlay("contextMenu", {
        variant: "default",
        position: { x: e.clientX, y: e.clientY },
        menuItems,
      })
    } else {
      debugMessage("No GridLauncher context menu items found")
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    e.stopPropagation()
    if (e.key === "Enter" || e.key === " ") {
      launcherService.openLauncher(meta, true)
    }
  }

  if (!meta) {
    debugMessage("GridLauncher is missing required metadata", meta)
    return null
  }

  return (
    <section
      ref={dragRef}
      role="launcher"
      tabIndex={0}
      className={`relative flex flex-col items-center
          ${disabled || isDragging ? "opacity-50" : "opacity-100"} 
          ${disabled ? "cursor-not-allowed" : "hover:brightness-110"}
          ${className}`}
      onMouseEnter={() => (disabled ? {} : setIsHovered(true))}
      onMouseLeave={() => (disabled ? {} : setIsHovered(false))}
      onKeyDown={handleKeyDown}
      onPointerUp={handlePointerUp}
      onPointerDown={handlePointerDown}
      onContextMenu={handleContextMenu}
    >
      <div className={`overflow-hidden rounded-md ${drawLabel ? "mt-1" : "p-1"} `}>
        <Icon
          name={icon ?? programIcon}
          style={{ width: iconSize, height: iconSize }}
          className={`text-text`}
        />
      </div>

      {drawLabel && (
        <LauncherLabel
          isMobile={false}
          isHovered={isHovered}
          isSelected={!!isSelected}
          label={label ?? name ?? "Unknown"}
          className={gridId === "home" ? "text-stone-200" : "text-text"}
        />
      )}

      {isExternalLauncher(meta) && (
        <div className="absolute top-0 right-2">
          <Icon name="OpenInNew" className="w-3 h-3 text-text" />
        </div>
      )}
    </section>
  )
})

function getContextMenuItems(
  id: string,
  meta: LauncherMetadata,
  gridId: GridId | undefined,
): MenuLauncherProps[] {
  if (gridId === undefined) {
    return []
  }

  const menuItems: MenuLauncherProps[] = []

  menuItems.push({
    icon: isExternalLauncher(meta) ? "OpenInNew" : "Files",
    iconSize: 16,
    label: "Open",
    meta: { target: { type: "action", action: "launchProgram", args: { id } } },
  })

  menuItems.push({
    icon: "Add",
    iconSize: 16,
    label: "Add to panel",
    meta: { target: { type: "action", action: "addLauncherToPanel", args: { meta } } },
  })

  menuItems.push({
    icon: "Delete",
    iconSize: 16,
    label: "Delete",
    meta: { target: { type: "action", action: "deleteLauncherFromHome", args: { id } } },
  })

  return menuItems
}

export default GridLauncher
