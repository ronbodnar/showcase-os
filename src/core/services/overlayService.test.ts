/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { overlayService } from "./overlayService"

const { mockOverlayGetState } = vi.hoisted(() => ({
  mockOverlayGetState: vi.fn(),
}))

vi.mock("@core/overlays/store/useOverlayStore", () => ({
  useOverlayStore: {
    getState: mockOverlayGetState,
  },
}))

describe("overlayService", () => {
  const openOverlaySpy = vi.fn()
  const closeOverlaySpy = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()

    mockOverlayGetState.mockReturnValue({
      type: null,
      openOverlay: openOverlaySpy,
      closeOverlay: closeOverlaySpy,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("canShowOverlay", () => {
    it("should return false if a contextMenu is currently open", () => {
      mockOverlayGetState.mockReturnValue({ type: "contextMenu" })
      expect(overlayService.canShowOverlay()).toBe(false)
    })

    it("should return true if no overlay or a non-modal overlay is open", () => {
      mockOverlayGetState.mockReturnValue({ type: "tooltip" })
      expect(overlayService.canShowOverlay()).toBe(true)
    })
  })

  describe("showOverlayWithDelay", () => {
    const mockEvent = {
      target: {
        getBoundingClientRect: () => ({ x: 100, y: 100, width: 50, height: 20 }),
      } as unknown as HTMLElement,
    } as any

    it("should trigger showOverlay after the specified delay", () => {
      overlayService.showOverlayWithDelay(
        mockEvent,
        "tooltip" as any,
        { text: "hello" } as any,
        500,
      )

      expect(openOverlaySpy).not.toHaveBeenCalled()

      vi.advanceTimersByTime(500)

      expect(openOverlaySpy).toHaveBeenCalledWith(
        "tooltip",
        expect.objectContaining({
          text: "hello",
          position: { x: 125, y: 100 },
        }),
      )
    })

    it("should cancel an existing timeout if called again quickly (debounce)", () => {
      overlayService.showOverlayWithDelay(
        mockEvent,
        "tooltip" as any,
        { text: "first" } as any,
        500,
      )
      vi.advanceTimersByTime(200)

      overlayService.showOverlayWithDelay(
        mockEvent,
        "tooltip" as any,
        { text: "second" } as any,
        500,
      )
      vi.advanceTimersByTime(500)

      expect(openOverlaySpy).toHaveBeenCalledTimes(1)
      expect(openOverlaySpy).toHaveBeenCalledWith(
        "tooltip",
        expect.objectContaining({ text: "second" }),
      )
    })

    it("should not show overlay if a contextMenu appeared during the delay", () => {
      overlayService.showOverlayWithDelay(
        mockEvent,
        "tooltip" as any,
        { text: "delayed" } as any,
        500,
      )

      // Simulate state change during the delay
      mockOverlayGetState.mockReturnValue({ type: "contextMenu" })

      vi.advanceTimersByTime(500)
      expect(openOverlaySpy).not.toHaveBeenCalled()
    })
  })

  describe("hideOverlayIfType", () => {
    it("should call closeOverlay if the type matches the current open overlay", () => {
      mockOverlayGetState.mockReturnValue({
        type: "tooltip",
        closeOverlay: closeOverlaySpy,
      })

      overlayService.hideOverlayIfType("tooltip" as any)
      expect(closeOverlaySpy).toHaveBeenCalled()
    })

    it("should NOT call closeOverlay if the type does not match", () => {
      mockOverlayGetState.mockReturnValue({
        type: "contextMenu",
        closeOverlay: closeOverlaySpy,
      })

      overlayService.hideOverlayIfType("tooltip" as any)
      expect(closeOverlaySpy).not.toHaveBeenCalled()
    })
  })
})
