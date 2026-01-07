import { createPortal } from "react-dom"
import { useOverlayStore } from "../store/useOverlayStore"
import { OverlayType, OverlayPayloads } from "../types"
import { ContextMenu } from "./ContextMenu"
import { Dialog } from "./Dialog"
import { Tooltip } from "./Tooltip"
import { WindowCompositor } from "./WindowCompositor"

const overlays: { [K in OverlayType]: React.ComponentType<OverlayPayloads[K]> } = {
  dialog: Dialog,
  contextMenu: ContextMenu,
  tooltip: Tooltip,
  windowPreview: WindowCompositor,
}

export function OverlayRoot() {
  const { type, payload } = useOverlayStore((state) => state)

  if (!type || !payload) {
    return null
  }

  const Component = overlays[type] as React.ComponentType<typeof payload>
  if (!Component) {
    return null
  }

  return createPortal(<Component {...payload} />, document.body)
}
