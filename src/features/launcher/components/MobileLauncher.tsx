import { memo, useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { useOverlayPosition } from "@core/hooks/useOverlayPosition"
import Icon from "@shared/components/Icon"
import { useLongPress } from "@shared/hooks/useLongPress"
import { ContextMenuPosition } from "types"
import { useLauncherDrag } from "../hooks/useLauncherDrag"
import { LauncherProps } from "../types"
import { getProgramMetaFromTarget, isExternalLauncher } from "../utils/launcher.utils"
import { LauncherLabel } from "./LauncherLabel"
import { debugMessage } from "@shared/utils/utils"
import { launcherService } from "../services/launcherService"

export const MobileLauncher = memo(function MobileLauncher({
  id,
  meta,
  gridId,
  iconSize,
  drawLabel = true,
  isDragPreview = false,
  className = "",
}: LauncherProps) {
  const hasDraggedRef = useRef<boolean>(false)
  const [isLongPressed, _setIsLongPressed] = useState(false)
  const [menuPosition, _setMenuPosition] = useState<ContextMenuPosition>({ x: -9999, y: -9999 })

  debugMessage("Rendering MobileLauncher", meta)

  const { icon, label, target, disabled } = meta ?? {}
  const { isDragging, dragRef } = useLauncherDrag({ id, meta, gridId, iconSize, isDragPreview })

  const { ref, coords } = useOverlayPosition({ position: menuPosition, constraint: "clamp" })

  const { bind: longPress } = useLongPress({
    onLongPress: (e) => {
      //const target = e.target as HTMLDivElement
      //const _rect = target.getBoundingClientRect()
      e.preventDefault()
      //setIsLongPressed(true)
      //setMenuPosition({ x: rect.x + rect.width / 2, y: rect.y - rect.height })
    },
    onTap: () => launcherService.openLauncher(meta, false),
    delay: 700,
  })

  useEffect(() => {
    hasDraggedRef.current = isDragging ?? false
  }, [isDragging])

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled) return
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false
      return
    }
    e.preventDefault()
    longPress.onPointerUp(e)
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled) return
    e.preventDefault()
    longPress.onPointerDown(e)
  }

  if (!meta) {
    debugMessage("GridLauncher is missing required metadata", meta)
    return null
  }

  const { name, icon: programIcon } = getProgramMetaFromTarget(target) ?? {}

  return (
    <>
      <motion.div
        ref={dragRef}
        role="launcher"
        className={`relative flex flex-col items-center
          ${isDragging ? "opacity-0" : disabled ? "opacity-50" : "opacity-100"} 
          ${disabled ? "cursor-not-allowed" : "hover:brightness-110"}
          ${className}`}
        onPointerUp={handlePointerUp}
        onPointerDown={handlePointerDown}
        onContextMenu={(e) => e.preventDefault()}
        animate={{
          y: isLongPressed ? [-3, 3] : 0,
        }}
        transition={{
          duration: 0.4,
          repeat: isLongPressed ? Infinity : 0,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <div className={`overflow-hidden rounded-md ${drawLabel ? "mt-1" : "p-1"} `}>
          <Icon
            name={icon ?? programIcon}
            style={{ width: iconSize, height: iconSize }}
            className={`text-text`}
          />
        </div>

        {drawLabel && !isLongPressed && (
          <LauncherLabel
            isMobile={true}
            isHovered={false}
            isSelected={false}
            label={label ?? name ?? "Unknown"}
            className={gridId === "home" ? "text-stone-200" : "text-text"}
          />
        )}

        {isExternalLauncher(meta) && (
          <div className="absolute top-2 right-2">
            <Icon name="OpenInNew" className="w-3 h-3 text-text" />
          </div>
        )}
      </motion.div>

      {isLongPressed && (
        <div
          ref={ref}
          className="absolute bg-shell/20 backdrop-blur-2xl"
          style={{ top: coords.y, left: coords.x }}
        >
          <div className="flex flex-col px-5">{name}</div>
        </div>
      )}
    </>
  )
})

export default MobileLauncher
