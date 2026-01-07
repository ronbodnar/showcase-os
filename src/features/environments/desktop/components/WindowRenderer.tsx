import { WindowInstance } from "@features/window/components/WindowInstance"
import { useWindowStore } from "@features/window/store/useWindowStore"

export function WindowRenderer() {
  const windows = useWindowStore((state) => state.windows)
  const zOrder = useWindowStore((state) => state.zOrder)
  const focusedWindowId = useWindowStore((state) => state.zOrder[state.zOrder.length - 1])

  return Object.keys(windows).map((windowId) => {
    const zIndex = zOrder.indexOf(windowId)
    return (
      <WindowInstance
        key={windowId}
        id={windowId}
        zIndex={zIndex + 10}
        isFocused={windowId === focusedWindowId}
      />
    )
  })
}
