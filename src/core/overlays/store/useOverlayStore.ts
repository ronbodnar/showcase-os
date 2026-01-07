import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { OverlayType, OverlayPayloads } from "../types"
import { XYCoordinate } from "types"

type StateValue =
  | { type: undefined; position: undefined; payload: undefined }
  | {
      [K in OverlayType]: { type: K; position: XYCoordinate; payload: OverlayPayloads[K] }
    }[OverlayType]

interface Action {
  openOverlay: <T extends OverlayType>(type: T, payload: OverlayPayloads[T]) => void
  closeOverlay: () => void
}

type OverlayState = StateValue & Action

const OVERLAY_STORE_NAME = "overlay-store"

export const useOverlayStore = create<OverlayState>()(
  devtools(
    (set) => ({
      type: undefined,
      position: undefined,
      payload: undefined,

      openOverlay: (type, payload) => set({ type, payload } as OverlayState),
      closeOverlay: () => set({ type: undefined, payload: undefined }),
    }),
    { name: OVERLAY_STORE_NAME },
  ),
)
