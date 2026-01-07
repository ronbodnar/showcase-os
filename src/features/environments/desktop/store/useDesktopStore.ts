import { create } from "zustand"
import { devtools } from "zustand/middleware"

export const DESKTOP_STORE_NAME = "desktop-store"

interface State {
  lastActionId: string
  lastActionTimestamp: number
  activeWindowId: string | undefined

  /*
   * Ephemeral windows are windows like the start menu that do not have a process.
   * They close when the user clicks outside of them.
   */
  ephemeralWindowId: string | undefined

  selectedLauncherIds: string[]

  /*
   * Track whether the desktop is being shown from the "Show the desktop" button on the panel.
   */
  isShowingDesktop: boolean
}

interface Action {
  reset: () => void
  setLastActionId: (id: string) => void
  setEphemeralWindowId: (id: string | undefined) => void
  selectLauncher: (id: string) => void
  addSelectedLauncher: (id: string) => void
  isSelectedLauncher: (id: string) => boolean
  clearSelectedLaunchers: () => void
  setShowingDesktop: (isShowingDesktop: boolean) => void
}

export type DesktopStore = State & Action

const defaultState: State = {
  lastActionId: "",
  lastActionTimestamp: 0,
  activeWindowId: undefined,
  ephemeralWindowId: undefined,
  selectedLauncherIds: [],
  isShowingDesktop: false,
}

export const useDesktopStore = create<DesktopStore>()(
  devtools(
    (set, get) => ({
      ...defaultState,

      reset: () => set(defaultState),

      setLastActionId: (id) => set({ lastActionId: id, lastActionTimestamp: Date.now() }),

      setEphemeralWindowId: (id) => set({ ephemeralWindowId: id }),

      selectLauncher: (id) => set({ selectedLauncherIds: [id] }),

      addSelectedLauncher: (id) => {
        set((state) => ({ selectedLauncherIds: [...state.selectedLauncherIds, id] }))
      },

      isSelectedLauncher: (id) => get().selectedLauncherIds.includes(id),

      clearSelectedLaunchers: () => set({ selectedLauncherIds: [] }),

      setShowingDesktop: (isShowingDesktop) => set({ isShowingDesktop }),
    }),
    { name: DESKTOP_STORE_NAME },
  ),
)
