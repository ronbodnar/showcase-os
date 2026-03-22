import { memo, useEffect, useState } from "react"
import { overlayService } from "@core/services/overlayService"
import { useTheme } from "@features/theme/hooks/useTheme"
import { IconName } from "@features/theme/types"
import { debugMessage } from "@shared/utils/utils"

interface Props {
  name: IconName | undefined
  tooltip?: string
  className?: string
  style?: React.CSSProperties
}
export const Icon = memo(({ name, tooltip, className, style }: Props) => {
  const theme = useTheme()
  const icon = name ? theme.icons[name] : undefined
  const [resolvedSrc, setResolvedSrc] = useState<
    string | React.FC<React.SVGProps<SVGSVGElement>> | undefined
  >(undefined)
  const { loader, title } = icon ?? {}

  useEffect(() => console.log("Resolved icon", icon, resolvedSrc), [icon, resolvedSrc])

  useEffect(() => {
    if (loader) {
      loader().then((src) => setResolvedSrc(src as string))
    }
  }, [loader])

  if (tooltip === "icon") {
    tooltip = title ?? name
  }

  const styles = {
    filter: "brightness(0.9) saturate(1.1) contrast(1.05)",
    opacity: 1,
    mixBlendMode: "normal",
    ...style,
  } as React.CSSProperties

  const isUrl = typeof resolvedSrc === "string"
  const isComponent = typeof resolvedSrc === "function"

  if (isUrl) {
    return (
      <img
        src={resolvedSrc}
        className={className}
        alt={name}
        style={styles}
        onMouseEnter={(e) =>
          tooltip && overlayService.showOverlayWithDelay(e, "tooltip", { text: tooltip })
        }
        onMouseLeave={() => tooltip && overlayService.hideOverlayIfType("tooltip")}
      />
    )
  }

  // Component is needed to apply fill to SVG icons
  if (isComponent) {
    const Component = resolvedSrc
    return (
      <Component
        className={className}
        style={styles}
        onMouseEnter={(e) =>
          tooltip && overlayService.showOverlayWithDelay(e, "tooltip", { text: tooltip })
        }
        onMouseLeave={() => tooltip && overlayService.hideOverlayIfType("tooltip")}
      />
    )
  }

  debugMessage("Icon", name, "is missing a valid src", icon, theme)
  return <div style={{ ...style }} />
})

export default Icon
