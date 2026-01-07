import { memo } from "react"
import { launcherService } from "../services/launcherService"
import { overlayService } from "@core/services/overlayService"
import { processService } from "@core/services/processService"
import { useGridStore } from "@features/grid/store/useGridStore"
import { ProgramId } from "@features/program/types"
import Icon from "@shared/components/icon/Icon"
import { useLauncherDrag } from "../hooks/useLauncherDrag"
import { useLauncherStatus } from "../hooks/useLauncherStatus"
import { useLauncherStore } from "../store/useLauncherStore"
import { LauncherProps, GridLauncherState, LauncherTarget, isLauncherProgramTarget } from "../types"
import { getProgramMetaFromTarget, isExternalLauncher } from "../utils/launcher.utils"
import { MenuLauncherProps } from "./MenuLauncher"
import { debugMessage } from "@shared/utils/utils"

export const PanelLauncher = memo(
  ({ id, meta, gridId, iconSize, isDragPreview = false }: LauncherProps) => {
    const state = useLauncherStore((state) => (id ? state.launchersById[id] : undefined))
    const panelPositionY = useGridStore((state) => state.grids["panel"]?.position?.y) ?? 0

    const { icon: launcherIcon, target, disabled } = meta ?? {}
    const {
      id: programId,
      name: programName,
      icon: programIcon,
      window,
    } = getProgramMetaFromTarget(target) ?? {}

    const { isDragging, dragRef } = useLauncherDrag({ id, meta, gridId, iconSize, isDragPreview })
    const { isWindowFocused, isProgramRunning, runningProgramCount } = useLauncherStatus(state)

    const runningProcessCount = processService.getRunningCountForProgramId(programId as ProgramId)

    function handleMouseEnter(e: React.MouseEvent) {
      if (runningProcessCount === 0) {
        overlayService.showOverlayWithDelay(e, "tooltip", {
          text: programName ?? meta.label ?? "Unknown",
        })
        return
      }

      overlayService.showOverlayWithDelay(e, "windowPreview", {
        windowIds: state?.displayIds ?? [],
        position: { x: e.clientX, y: panelPositionY },
      })
    }

    function handleContextMenu(e: React.MouseEvent) {
      e.stopPropagation()
      overlayService.showOverlay("contextMenu", {
        variant: "panel",
        position: { x: e.clientX, y: panelPositionY },
        menuItems: getContextMenuItems(id, state, target, runningProgramCount),
      })
    }

    if (!meta) {
      debugMessage("Launcher is missing required metadata", meta)
      return null
    }

    const isEphemeral = window?.isEphemeral ?? false

    const indicatorBarColor = isWindowFocused
      ? "bg-accent"
      : isProgramRunning && !isEphemeral
        ? "bg-surface-hover-alt"
        : "bg-transparent"

    function handleKeyDown(e: React.KeyboardEvent) {
      e.stopPropagation()
      if (e.key === "Enter" || e.key === " ") {
        launcherService.openLauncher(meta, true)
      }
    }

    function handlePointerEvent(e: React.PointerEvent<HTMLDivElement>) {
      if (e.button !== 0) {
        return
      }

      overlayService.hideOverlay()
      launcherService.handleLauncherClick(e, meta, id, gridId)
    }

    const handleMouseLeave = () => overlayService.hideOverlayIfType("tooltip")

    const icon = programIcon ?? launcherIcon

    return (
      <div
        ref={dragRef}
        role="launcher"
        tabIndex={0}
        className={`
            relative flex flex-col items-center hover:bg-surface 
            ${isWindowFocused ? "bg-surface bg-opacity-50" : ""} 
            ${isDragging || disabled ? "opacity-50" : "opacity-100"}`}
        onPointerUp={handlePointerEvent}
        onPointerDown={handlePointerEvent}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onContextMenu={handleContextMenu}
      >
        {runningProcessCount > 1 && (
          <div
            className={`
            absolute top-0 left-0 flex items-center justify-center w-4 h-4 text-[12px] rounded-full 
          bg-accent text-white text-shadow-2xs text-shadow-black border border-border z-50`}
          >
            {runningProcessCount}
          </div>
        )}

        {icon && (
          <Icon
            name={icon}
            style={{ width: iconSize, height: iconSize }}
            className={`object-contain rounded-lg text-text ${isEphemeral ? "p-0.75" : "p-1"}`}
          />
        )}

        {!isEphemeral && (
          <div className={`absolute bottom-0 h-0.75 w-full rounded-xs ${indicatorBarColor}`} />
        )}
      </div>
    )
  },
)

function getContextMenuItems(
  id: string,
  state: GridLauncherState | undefined,
  target: LauncherTarget | undefined,
  runningProgramCount: number,
): MenuLauncherProps[] {
  const isProgramLauncher = isLauncherProgramTarget(target)
  if (isProgramLauncher && target.programId === "start_menu") {
    return []
  }

  const pin: MenuLauncherProps = {
    icon: "PinWindow",
    iconSize: 16,
    label: "Pin to panel",
    meta: { target: { type: "action", action: "addLauncherToPanel", args: { id } } },
  }

  const unpin: MenuLauncherProps = {
    icon: "UnpinWindow",
    iconSize: 16,
    label: "Unpin from panel",
    meta: { target: { type: "action", action: "unpinLauncherFromPanel", args: { id } } },
  }

  const newWindow: MenuLauncherProps = {
    icon: "WindowNew",
    iconSize: 16,
    label: "New window",
    meta: { target: { type: "action", action: "launchProgram", args: { id } } },
  }

  const newTab: MenuLauncherProps = {
    icon: "OpenInNew",
    iconSize: 16,
    label: "Open in new tab",
    meta: { target: { type: "action", action: "launchProgram", args: { id } } },
  }

  const close: MenuLauncherProps = {
    icon: "Delete",
    iconSize: 16,
    label: runningProgramCount === 1 ? "Close" : "Close all",
    meta: { target: { type: "action", action: "closeLauncherWindows", args: { id } } },
  }

  const menuItems: MenuLauncherProps[] = []

  if (
    runningProgramCount === 0 ||
    (isProgramLauncher && getProgramMetaFromTarget(target)?.allowMultipleInstances)
  ) {
    menuItems.push(state && isExternalLauncher(state.meta) ? newTab : newWindow)
  }

  menuItems.push(state?.isPinned ? unpin : pin)

  if (runningProgramCount > 0) {
    menuItems.push(close)
  }

  return menuItems
}

export default PanelLauncher
