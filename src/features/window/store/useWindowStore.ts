import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { useDesktopStore } from "@features/environments/desktop/store/useDesktopStore"
import { WindowSize, WindowPosition } from "types"
import { WindowState } from "../types"

export const WINDOW_STORE_NAME = "window-store"

interface State {
  windows: Record<string, WindowState>
  zOrder: string[]
}

interface Action {
  reset: () => void

  setZOrder: (zOrder: string[]) => void
  clearZOrder: () => void

  addWindow: (window: WindowState) => void
  removeWindow: (id: string) => void

  focusWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string, homeScreenSize: WindowSize) => void
  restoreWindow: (id: string) => void

  moveWindow: (id: string, position: WindowPosition) => void
  resizeWindow: (id: string, size: WindowSize) => void

  updateAllWindows: (updater: (w: WindowState) => WindowState) => void
  hideAllWindows: () => void
  unhideAllWindows: () => void

  setTitle: (id: string, title: string) => void
}

export type WindowStore = State & Action

const defaultState: State = {
  windows: {},
  zOrder: [],
}

export const useWindowStore = create<WindowStore>()(
  devtools(
    (set, _get) => ({
      ...defaultState,

      reset: () => set(defaultState),

      setZOrder: (zOrder) => set({ zOrder }),

      clearZOrder: () => set({ zOrder: [] }),

      addWindow: (window) =>
        set((state) => ({
          windows: { ...state.windows, [window.id]: window },
          zOrder: [...state.zOrder, window.id],
        })),

      removeWindow: (id) =>
        set((state) => {
          const updatedWindows = { ...state.windows }
          delete updatedWindows[id]
          return {
            windows: updatedWindows,
            zOrder: state.zOrder.filter((w) => w !== id),
          }
        }),

      removeAllWindows: () => set({ windows: {}, zOrder: [] }),

      focusWindow: (id) => {
        set((state) => {
          const window = state.windows[id]
          if (!window || (!window.isMinimized && state.zOrder[state.zOrder.length - 1] === id)) {
            return state
          }

          return {
            windows: {
              ...state.windows,
              [id]: { ...state.windows[id], hiddenByDesktopMode: false, isMinimized: false },
            },
            zOrder: [...state.zOrder.filter((w) => w !== id), id],
          }
        })

        useDesktopStore.getState().setShowingDesktop(false)
      },

      minimizeWindow: (id) =>
        set((state) => {
          const updatedState = updateWindow(state, id, (w) => ({ ...w, isMinimized: true }))
          return {
            //zOrder: state.zOrder.filter((w) => w !== id),
            windows: updatedState.windows,
          }
        }),

      maximizeWindow: (id, desktopSize) =>
        set((state) =>
          updateWindow(state, id, (w) => ({
            ...w,
            isMaximized: true,
            isMinimized: false,
            previousSize: { ...w.size },
            previousPosition: { ...w.position },
            size: { width: desktopSize.width, height: desktopSize.height },
            position: { x: 0, y: 0 },
          })),
        ),

      restoreWindow: (id) =>
        set((state) =>
          updateWindow(state, id, (w) => ({
            ...w,
            isMaximized: false,
            size: { ...w.previousSize },
            position: { ...w.previousPosition },
          })),
        ),

      moveWindow: (id, position) =>
        set((state) => {
          const currentPosition = state.windows[id].position
          const positionChanged =
            position.x !== currentPosition.x || position.y !== currentPosition.y
          if (!positionChanged) {
            return state
          }
          return updateWindow(state, id, (w) => ({ ...w, position: { ...position } }))
        }),

      resizeWindow: (id, size) =>
        set((state) => {
          const currentSize = state.windows[id].size
          const sizeChanged = size.width !== currentSize.width || size.height !== currentSize.height
          if (!sizeChanged) {
            return state
          }
          return updateWindow(state, id, (w) => ({
            ...w,
            previousSize: { ...w.size },
            size: { ...size },
          }))
        }),

      updateAllWindows: (updater) =>
        set((state) => ({
          windows: Object.fromEntries(
            Object.entries(state.windows).map(([id, w]) => [id, updater(w)]),
          ),
        })),

      hideAllWindows: () =>
        set((state) => ({
          windows: Object.fromEntries(
            Object.entries(state.windows).map(([id, w]) => [
              id,
              { ...w, hiddenByDesktopMode: true },
            ]),
          ),
          zOrder: [],
        })),

      unhideAllWindows: () =>
        set((state) => ({
          windows: Object.fromEntries(
            Object.entries(state.windows).map(([id, w]) => [
              id,
              { ...w, hiddenByDesktopMode: false },
            ]),
          ),
        })),

      setTitle: (id, title) => set((state) => updateWindow(state, id, (w) => ({ ...w, title }))),
    }),
    { name: WINDOW_STORE_NAME },
  ),
)

function updateWindow(
  stateStore: WindowStore,
  id: string,
  updater: (w: WindowState) => WindowState,
): Partial<WindowStore> {
  const window = stateStore.windows[id]
  return window ? { windows: { ...stateStore.windows, [id]: updater(window) } } : {}
}
