import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { systemService } from "./systemService"
import { osService } from "./osService"
import { overlayService } from "./overlayService"
import { executeAction } from "@features/os/actions/systemRegistry"

const { mockWindowStore, mockDesktopStore, mockProcessStore, mockLauncherStore } = vi.hoisted(
  () => ({
    mockWindowStore: { getState: vi.fn() },
    mockDesktopStore: { getState: vi.fn() },
    mockProcessStore: { getState: vi.fn() },
    mockLauncherStore: { getState: vi.fn() },
  }),
)

vi.mock("@features/window/store/useWindowStore", () => ({ useWindowStore: mockWindowStore }))
vi.mock("@features/environments/desktop/store/useDesktopStore", () => ({
  useDesktopStore: mockDesktopStore,
}))
vi.mock("@core/store/useProcessStore", () => ({ useProcessStore: mockProcessStore }))
vi.mock("@features/launcher/store/useLauncherStore", () => ({
  useLauncherStore: mockLauncherStore,
}))

vi.mock("./osService")
vi.mock("./overlayService")
vi.mock("@features/os/actions/systemRegistry")

describe("systemService", () => {
  const windowResetSpy = vi.fn()
  const desktopResetSpy = vi.fn()
  const processResetSpy = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()

    mockWindowStore.getState.mockReturnValue({
      reset: windowResetSpy,
      hideAllWindows: vi.fn(),
      unhideAllWindows: vi.fn(),
    })
    mockDesktopStore.getState.mockReturnValue({
      reset: desktopResetSpy,
      setShowingDesktop: vi.fn(),
      isShowingDesktop: false,
    })
    mockProcessStore.getState.mockReturnValue({
      reset: processResetSpy,
    })
    mockLauncherStore.getState.mockReturnValue({
      resetLaunchers: vi.fn(),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("shutdown", () => {
    it("should hide overlay, reset all stores, and set status to shutdown", () => {
      systemService.shutdown()

      expect(overlayService.hideOverlay).toHaveBeenCalled()
      expect(windowResetSpy).toHaveBeenCalled()
      expect(desktopResetSpy).toHaveBeenCalled()
      expect(processResetSpy).toHaveBeenCalled()
      expect(osService.setStatus).toHaveBeenCalledWith("shutdown")
    })
  })

  describe("reboot", () => {
    it("should trigger shutdown action and set status to booting after delay", () => {
      systemService.reboot()

      expect(executeAction).toHaveBeenCalledWith("shutdown")

      vi.advanceTimersByTime(2500)

      expect(osService.setStatus).toHaveBeenCalledWith("booting")
      expect(overlayService.hideOverlay).toHaveBeenCalled()
    })
  })

  describe("toggleShowDesktop", () => {
    it("should hide windows and set showingDesktop true when false", () => {
      const hideSpy = vi.fn()
      const setDesktopSpy = vi.fn()

      mockDesktopStore.getState.mockReturnValue({
        isShowingDesktop: false,
        setShowingDesktop: setDesktopSpy,
      })
      mockWindowStore.getState.mockReturnValue({
        hideAllWindows: hideSpy,
      })

      systemService.toggleShowDesktop()

      expect(hideSpy).toHaveBeenCalled()
      expect(setDesktopSpy).toHaveBeenCalledWith(true)
    })

    it("should unhide windows and set showingDesktop false when true", () => {
      const unhideSpy = vi.fn()
      const setDesktopSpy = vi.fn()

      mockDesktopStore.getState.mockReturnValue({
        isShowingDesktop: true,
        setShowingDesktop: setDesktopSpy,
      })
      mockWindowStore.getState.mockReturnValue({
        unhideAllWindows: unhideSpy,
      })

      systemService.toggleShowDesktop()

      expect(unhideSpy).toHaveBeenCalled()
      expect(setDesktopSpy).toHaveBeenCalledWith(false)
    })
  })

  describe("resetHomeScreen", () => {
    it("should call resetLaunchers with 'home'", () => {
      const resetLaunchersSpy = vi.fn()
      mockLauncherStore.getState.mockReturnValue({
        resetLaunchers: resetLaunchersSpy,
      })

      systemService.resetHomeScreen()

      expect(resetLaunchersSpy).toHaveBeenCalledWith("home")
    })
  })
})
