import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { GridState, GridId } from "../types"
import { GridContainerSize } from "types"

export const GRID_STORE_NAME = "grid-store"

interface State {
  grids: Record<string, GridState>
}

interface Action {
  reset: () => void
  ensureGrid: (defaultState: GridState) => void
  getGridById: (id: GridId) => GridState | undefined
  setRows: (id: string, rows: number) => void
  setCols: (id: string, cols: number) => void
  setSize: (id: string, size: GridContainerSize) => void
}

export type GridStore = State & Action

const defaultState: State = {
  grids: {},
}

export const useGridStore = create<GridStore>()(
  devtools(
    (set, get) => ({
      ...defaultState,

      reset: () => set(defaultState),

      ensureGrid: (defaultState) => {
        const id = defaultState.id
        if (!id) {
          throw new Error("Grid id is required")
        }
        set((state) => {
          if (state.grids[id]) {
            return state
          }
          return {
            grids: {
              ...state.grids,
              [id]: {
                ...defaultState,
                id,
              },
            },
          }
        })
      },

      removeAllGrids: () => set({ grids: {} }),

      getGridById: (id) => get().grids[id],

      setRows: (id, rows) =>
        set((state) => {
          const grid = state.grids[id]
          if (!grid || grid.rows === rows) {
            return state
          }
          return { grids: { ...state.grids, [id]: { ...grid, rows } } }
        }),

      setCols: (id, cols) =>
        set((state) => {
          const grid = state.grids[id]
          if (!grid || grid.cols === cols) {
            return state
          }
          return { grids: { ...state.grids, [id]: { ...grid, cols } } }
        }),

      setSize: (id, size) =>
        set((state) => {
          const grid = state.grids[id]
          if (!grid || (grid.size.width === size.width && grid.size.height === size.height)) {
            return state
          }
          return {
            grids: {
              ...state.grids,
              [id]: { ...grid, size: size },
            },
          }
        }),
    }),
    { name: GRID_STORE_NAME },
  ),
)
