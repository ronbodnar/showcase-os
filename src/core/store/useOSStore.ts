import { create } from "zustand"
import { devtools } from "zustand/middleware"

export type OSPlatform = "desktop" | "mobile"
export type OSStatus = "booting" | "locked" | "unlocked" | "shutdown"

interface State {
  status: OSStatus
  platform: OSPlatform
}

interface Action {
  setStatus: (status: OSStatus) => void
  setPlatform: (platform: OSPlatform) => void
  hasStatus: (platform: OSStatus) => boolean
  hasPlatform: (platform: OSPlatform) => boolean
  isDesktop: () => boolean
  isMobile: () => boolean
}

type OSStore = State & Action

const defaultState: State = {
  status: "booting",
  platform: "mobile",
}

export const OS_STORE_NAME = "os-store"

export const useOSStore = create<OSStore>()(
  devtools(
    (set, get) => ({
      ...defaultState,

      setStatus: (status) => set({ status }),

      setPlatform: (platform) =>
        set((state) => {
          if (state.platform === platform) return state
          return { platform }
        }),

      hasStatus: (status) => get().status === status,

      hasPlatform: (platform) => get().platform === platform,

      isDesktop: () => get().platform === "desktop",

      isMobile: () => get().platform === "mobile",
    }),
    { name: OS_STORE_NAME },
  ),
)
