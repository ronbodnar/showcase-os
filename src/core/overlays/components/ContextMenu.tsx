import { useOverlayPosition } from "@core/hooks/useOverlayPosition"
import MenuLauncher, { MenuLauncherProps } from "@features/launcher/components/MenuLauncher"
import { ContextMenuPosition, XYCoordinate } from "types"

export type ContextMenuVariant = "default" | "panel"

export interface ContextMenuProps {
  variant: ContextMenuVariant
  position: ContextMenuPosition | undefined
  menuItems: MenuLauncherProps[]
}

export function ContextMenu(props: ContextMenuProps) {
  const { variant, position, menuItems } = props
  const { ref, coords } = useOverlayPosition({ position, constraint: "viewport" })

  const variantStyles: Record<ContextMenuVariant, string> = {
    default: "rounded-md bg-window border border-border-darker py-1",
    panel: "rounded-md rounded-b-none bg-window py-2",
  }

  const launcherStyles: Record<ContextMenuVariant, string> = {
    default: "hover:bg-surface-hover-alt px-1 pr-4 py-0.5",
    panel: " hover:bg-surface px-3 py-1",
  }

  const variantOffset: Record<ContextMenuVariant, XYCoordinate> = {
    default: { x: 0, y: 0 },
    panel: {
      x: (ref.current?.clientWidth ?? 0) / 2,
      y: 0,
    },
  }

  if (!variant) {
    return null
  }

  const y = coords.y - variantOffset[variant].y
  const x = coords.x - variantOffset[variant].x

  return (
    <div ref={ref} className={`fixed z-9999 ${variantStyles[variant]}`} style={{ left: x, top: y }}>
      <div className="flex flex-col">
        {menuItems.map((menuItem, index) => (
          <MenuLauncher
            key={`ctxMenu-${index}`}
            {...menuItem}
            className={launcherStyles[variant]}
          />
        ))}
      </div>
    </div>
  )
}
