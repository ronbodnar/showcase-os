import { osService } from "@core/services/osService"
import { processService } from "@core/services/processService"
import { useDesktopStore } from "@features/environments/desktop/store/useDesktopStore"
import { useGridStore } from "@features/grid/store/useGridStore"
import { WindowMetadata } from "@features/program/types"
import { clickedInside } from "@shared/utils/ui.utils"
import { ClickPosition, GridContainerSize } from "types"
import { useWindowFrameRefs } from "../store/useWindowRefs"
import { useWindowStore } from "../store/useWindowStore"
import { WindowState } from "../types"
import { clamp, debugMessage } from "@shared/utils/utils"
import { config } from "@config/config"

export const windowService = {
  createWindow: (
    processId: number,
    meta: WindowMetadata | undefined,
    title?: string,
    silent?: boolean,
  ) => {
    const gridStore = useGridStore.getState()
    const desktopStore = useDesktopStore.getState()
    const isDesktop = osService.isDesktop()

    const homeScreenSize = gridStore.getGridById("home")?.size
    if (!homeScreenSize) {
      throw new Error(
        'Home screen grid is not set. Ensure the main grid ID for the home screen area is "home"!',
      )
    }

    const minHeight = config.windows.minHeight
    const minWidth = config.windows.minWidth

    const {
      spawn,
      minSize = { width: minWidth, height: minHeight },
      maxSize,
      anchor,
      isEphemeral,
    } = meta ?? {}

    const spawnSize = spawn?.size ?? { width: 0.5, height: 0.5, unit: "%" }

    const spawnWidthCalc =
      spawnSize.unit === "%" ? homeScreenSize.width * spawnSize.width : spawnSize.width

    const spawnHeightCalc =
      spawnSize.unit === "%" ? homeScreenSize.height * spawnSize.height : spawnSize.height

    const windowWidth = clamp(
      spawnWidthCalc,
      spawn?.minSize?.width ?? minWidth,
      spawn?.maxSize?.width ?? window.innerWidth,
    )
    const windowHeight = clamp(
      spawnHeightCalc,
      spawn?.minSize?.height ?? minHeight,
      spawn?.maxSize?.height ?? window.innerHeight,
    )

    let windowX = (homeScreenSize.width - windowWidth) / 2
    let windowY = (homeScreenSize.height - windowHeight) / 2

    if (anchor) {
      switch (anchor) {
        case "top-left":
          windowX = 0
          windowY = 0
          break

        case "bottom-center":
          windowY = homeScreenSize.height - windowHeight
          break

        case "bottom-right":
          windowX = homeScreenSize.width - windowWidth
          windowY = homeScreenSize.height - windowHeight
          break
      }
    }

    const position = {
      x: isDesktop ? windowX : 0,
      y: isDesktop ? windowY : 28,
    }

    const size = {
      width: isDesktop ? windowWidth : homeScreenSize.width,
      height: isDesktop ? windowHeight : homeScreenSize.height,
    }

    const windowId = `window:${processId}`
    const windowState: WindowState = {
      id: windowId,
      processId,

      title: title ?? "Untitled",

      position: position,
      previousPosition: position,

      size: size,
      minSize: minSize,
      maxSize: maxSize,
      previousSize: size,

      isMinimized: !!silent,
      isMaximized: spawnSize.unit === "%" && spawnSize.width === 1 && spawnSize.height === 1,
    }

    debugMessage("Window State", windowState)

    if (silent && isEphemeral && isDesktop) {
      desktopStore.setEphemeralWindowId(windowId)
    }

    return windowState
  },

  getWindow: (id: string) => useWindowStore.getState().windows[id],

  closeWindow: (id: string) => {
    const { removeWindow, windows } = useWindowStore.getState()
    const removeWindowFrameRef = useWindowFrameRefs.getState().removeWindowFrameRef
    const processId = windows[id].processId

    removeWindowFrameRef(id)
    removeWindow(id)

    if (processId) {
      processService.stopProcess(processId)
    }
  },

  closeAllWindows: () => {
    const { windows } = useWindowStore.getState()
    Object.keys(windows).forEach((windowId) => {
      windowService.closeWindow(windowId)
    })
  },

  focusWindow: (id: string) => {
    useWindowStore.getState().focusWindow(id)
  },

  minimizeWindow: (id: string) => {
    useWindowStore.getState().minimizeWindow(id)
  },

  focusOrMinimizeWindow: (id: string) => {
    const { windows, zOrder, focusWindow, minimizeWindow } = useWindowStore.getState()
    const window = windows[id]
    if (!window) {
      debugMessage(`Window with id "${id}" not found!`)
      return
    }

    const focusedWindowId = zOrder[zOrder.length - 1]
    if (focusedWindowId === id && !window.isMinimized) {
      minimizeWindow(id)
    } else {
      focusWindow(id)
    }
  },

  maximizeOrRestoreWindow: (id: string) => {
    const window = useWindowStore.getState().windows[id]
    if (!window) {
      throw new Error(`Window ${id} is not defined`)
    }

    if (window.isMaximized) {
      useWindowStore.getState().restoreWindow(id)
    } else {
      const desktopSize = useGridStore.getState().getGridById("home")?.size
      if (!desktopSize) {
        throw new Error(
          'Home screen grid is not set. Ensure the main grid ID for the home screen area is "home"!',
        )
      }
      useWindowStore.getState().maximizeWindow(id, desktopSize)
    }
  },

  reconcileWindowPositions: (oldGridSize: GridContainerSize) => {
    const { updateAllWindows } = useWindowStore.getState()

    const grid = useGridStore.getState().getGridById("home")
    if (!grid) {
      debugMessage(`Grid with id "home" is not found`)
      return
    }

    const { width: oldGridWidth, height: oldGridHeight } = oldGridSize
    const { width: gridWidth, height: gridHeight } = grid.size

    if (gridWidth === 0 || gridHeight === 0) {
      return
    }

    const scaleX = gridWidth / oldGridWidth
    const scaleY = gridHeight / oldGridHeight

    updateAllWindows((window) => {
      const { position, size } = window

      const { width, height } = size
      const { x, y } = position

      // When oldGridWidth is not yet available (if you launch a process before the grid is ready) scaleX and scaleY will be Infinity.
      if (scaleX === Infinity || scaleY === Infinity) {
        return window
      }

      return {
        ...window,
        position: { x: Math.round(x * scaleX), y: Math.round(y * scaleY) },
        size: { width: Math.round(width * scaleX), height: Math.round(height * scaleY) },
      }
    })
  },

  tryCloseEphemeralWindow: (clickPosition?: ClickPosition) => {
    const { windows, minimizeWindow } = useWindowStore.getState()
    const { ephemeralWindowId, setEphemeralWindowId } = useDesktopStore.getState()

    const ephemeralWindow = ephemeralWindowId ? windows[ephemeralWindowId] : undefined
    if (!ephemeralWindow) {
      return false
    }

    const { id, size, position } = ephemeralWindow

    if (!clickPosition || !clickedInside(clickPosition, position, size)) {
      minimizeWindow(id)
      setEphemeralWindowId(undefined)
      return true
    }

    return false
  },
}
