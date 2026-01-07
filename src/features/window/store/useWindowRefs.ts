import { create } from "zustand"

interface State {
  windowFrameRefs: Record<string, React.RefObject<HTMLDivElement | null>>
}

interface Action {
  addWindowFrameRef: (id: string, ref: React.RefObject<HTMLDivElement | null>) => void
  removeWindowFrameRef: (id: string) => void
  clearWindowFrameRefs: () => void
}

export type WindowFrameRefStore = State & Action

const defaultState: State = {
  windowFrameRefs: {},
}

export const useWindowFrameRefs = create<WindowFrameRefStore>()((set, _get) => ({
  ...defaultState,

  addWindowFrameRef: (id, ref) =>
    set((state) => ({
      windowFrameRefs: { ...state.windowFrameRefs, [id]: ref },
    })),

  removeWindowFrameRef: (id) =>
    set((state) => {
      const updatedWindows = { ...state.windowFrameRefs }
      delete updatedWindows[id]
      return {
        windowFrameRefs: updatedWindows,
      }
    }),

  clearWindowFrameRefs: () => set({ windowFrameRefs: {} }),
}))
