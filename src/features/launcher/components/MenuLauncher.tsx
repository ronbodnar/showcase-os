import React, { memo } from "react"
import { LauncherMetadata } from "../types"
import { IconName } from "@features/theme/types"
import Icon from "@shared/components/Icon"
import { overlayService } from "@core/services/overlayService"
import { debugMessage } from "@shared/utils/utils"
import { launcherService } from "../services/launcherService"

export interface MenuLauncherProps {
  meta: LauncherMetadata

  label?: string
  labelSize?: number
  icon?: IconName
  iconSize?: number
  className?: string
}

export const MenuLauncher = memo(
  ({ icon, iconSize = 22, label, labelSize = 12, meta, className }: MenuLauncherProps) => {
    if (!meta) {
      debugMessage("LauncherMenuItem is missing LauncherMetadata for label: ", label)
      return null
    }

    function handleKeyDown(e: React.KeyboardEvent) {
      e.stopPropagation()
      if (e.key === "Enter" || e.key === " ") {
        launcherService.openLauncher(meta, false)
      }
    }

    function handleMouseEnter(e: React.MouseEvent) {
      if (meta.disabled && typeof meta.disabledText === "string") {
        overlayService.showOverlayWithDelay(e, "tooltip", { text: meta.disabledText })
      }
    }

    function handleMouseLeave(_e: React.MouseEvent) {
      overlayService.hideOverlayIfType("tooltip")
    }

    return (
      <div
        tabIndex={0}
        className={`
        w-full flex-1 flex items-center text-text ${meta.disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
        onPointerDown={(e) => launcherService.handleLauncherClick(e, meta)}
        onPointerUp={(e) => launcherService.handleLauncherClick(e, meta)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
      >
        <div className="pr-3">
          <div className="overflow-hidden rounded-md">
            <Icon
              name={icon ?? meta.icon}
              className="object-contain text-text"
              style={{ width: iconSize, height: iconSize }}
            />
          </div>
        </div>

        <div className="line-clamp-1 text-ellipsis" style={{ fontSize: labelSize }}>
          {label ?? meta.label}
        </div>
      </div>
    )
  },
)

export default MenuLauncher
