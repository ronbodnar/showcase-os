import { overlayService } from "@core/services/overlayService"
import { useMediaQuery } from "@shared/hooks/useMediaQuery"
import { motion } from "motion/react"

export interface ButtonProps {
  children: React.ReactNode
  className?: string
  whileTap?: Record<string, string | number>
  color?: ButtonColor
  disabled?: boolean
  tooltipText?: string
  onClick?: (e: React.MouseEvent) => void | Promise<void>
  onMouseEnter?: (e: React.MouseEvent) => void
  onMouseLeave?: (e: React.MouseEvent) => void
}

export type ButtonColor =
  | "accent"
  | "surface"
  | "surface-alt"
  | "surface-accent"
  | "shell"
  | "window"
  | "transparent"
  | "danger"

const COLOR_MAP: Record<ButtonColor, string> = {
  "accent": "bg-accent",
  "surface": "bg-surface",
  "surface-alt": "bg-surface-alt",
  "surface-accent": "bg-surface-accent",
  "shell": "bg-shell",
  "window": "bg-window",
  "transparent": "bg-transparent",
  "danger": "bg-danger",
}

const HOVER_MAP: Record<ButtonColor, string> = {
  "accent": "hover:bg-accent-hover",
  "surface": "hover:bg-surface-hover",
  "surface-alt": "hover:bg-surface-hover",
  "surface-accent": "hover:bg-surface-accent-hover",
  "shell": "hover:bg-surface-alt",
  "window": "hover:bg-surface-hover-alt",
  "transparent": "hover:bg-transparent",
  "danger": "hover:bg-danger-hover",
}

export function Button({
  children,
  className,
  whileTap,
  color,
  tooltipText,
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled = false,
}: ButtonProps) {
  const backgroundColor = color ? COLOR_MAP[color] : ""
  const hoverColor = color && !disabled ? HOVER_MAP[color] : ""
  const cursor = getCursor(onClick !== undefined, disabled)
  const isMobile = useMediaQuery("(max-width: 1024px)")

  function handleMouseEnter(e: React.MouseEvent) {
    if (onMouseEnter) {
      onMouseEnter(e)
    }
    if (tooltipText) {
      overlayService.showOverlayWithDelay(e, "tooltip", { text: tooltipText })
    }
  }

  function handleMouseLeave(e: React.MouseEvent) {
    if (onMouseLeave) {
      onMouseLeave(e)
    }
    overlayService.hideOverlayIfType("tooltip")
  }

  return (
    <motion.button
      role="button"
      className={`
          flex items-center justify-center gap-2
          ${backgroundColor} ${cursor} ${hoverColor}
          ${disabled ? "opacity-50" : "opacity-100"}
          ${className ?? ""}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      /* whileTap causes issues with disabled state transitions.
         Notably within the Browser navigation pane on desktop environments. */
      whileTap={
        disabled || !isMobile
          ? {}
          : {
              scale: 0.95,
              opacity: 0.75,
              ...(whileTap ?? {}),
            }
      }
    >
      {children}
    </motion.button>
  )
}

const getCursor = (pointer: boolean, disabled?: boolean) => {
  if (disabled) {
    return "cursor-not-allowed"
  }
  if (pointer) {
    return "cursor-pointer"
  }
  return "cursor-default"
}
