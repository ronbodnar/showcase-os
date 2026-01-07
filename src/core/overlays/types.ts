import { ContextMenuProps } from "./components/ContextMenu"
import { DialogProps } from "./components/Dialog"
import { TooltipProps } from "./components/Tooltip"
import { WindowCompositorProps } from "./components/WindowCompositor"

export interface SystemOverlayPayloads {
  dialog: DialogProps
}

export interface TransientOverlayPayloads {
  tooltip: TooltipProps
  contextMenu: ContextMenuProps
  windowPreview: WindowCompositorProps
}
export type TransientOverlayType = keyof TransientOverlayPayloads

export type OverlayPayloads = SystemOverlayPayloads & TransientOverlayPayloads
export type OverlayType = keyof OverlayPayloads
