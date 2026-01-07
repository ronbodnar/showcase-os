import { DialogProps } from "@core/overlays/components/Dialog"
import { useOverlayStore } from "@core/overlays/store/useOverlayStore"
import { OverlayType, OverlayPayloads } from "@core/overlays/types"

let overlayTimeout: NodeJS.Timeout | undefined = undefined

export const overlayService = {
  isShowingOverlay: (type: OverlayType) => useOverlayStore.getState().type === type,

  canShowOverlay: () => {
    const current = useOverlayStore.getState().type
    /*
     * Context menus are essentially system modal overlays, which should always be shown.
     * A specific example where this shows is when hovering a Panel Launcher:
     *  - The Panel Launcher onMouseEnter triggers a delayed tooltip or composite preview(s)
     *  - The user right clicks to trigger the context menu on the launcher before the delayed overlay is shown
     *  - The context menu is opened, and then the delayed tooltip/preview is shown which closes the context menu
     */
    return current !== "contextMenu"
  },

  showOverlayWithDelay: <T extends OverlayType>(
    e: React.MouseEvent | React.PointerEvent<HTMLDivElement>,
    type: T,
    payload: OverlayPayloads[T],
    delay: number = 300,
  ) => {
    if (overlayTimeout) {
      clearTimeout(overlayTimeout)
    }

    const rect = (e.target as HTMLElement).getBoundingClientRect()

    overlayTimeout = setTimeout(() => {
      if (!overlayService.canShowOverlay()) {
        return
      }
      overlayService.showOverlay(type, {
        ...payload,
        position: { x: rect.x + rect.width / 2, y: rect.y },
      })
      overlayTimeout = undefined
    }, delay)
  },

  showOverlay: <T extends OverlayType>(type: T, payload: OverlayPayloads[T]) => {
    useOverlayStore.getState().openOverlay(type, payload)
  },

  hideOverlay: () => {
    resetOverlayTimeout()
    useOverlayStore.getState().closeOverlay()
  },

  hideOverlayIfType: (type: OverlayType) => {
    const current = useOverlayStore.getState().type

    resetOverlayTimeout()

    if (current === type) {
      overlayService.hideOverlay()
    }
  },

  showDialog: (props: DialogProps) => {
    useOverlayStore.getState().openOverlay("dialog", props)
  },
}

function resetOverlayTimeout() {
  if (overlayTimeout) {
    clearTimeout(overlayTimeout)
    overlayTimeout = undefined
  }
}
