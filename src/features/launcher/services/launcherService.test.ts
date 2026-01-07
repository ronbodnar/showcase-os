/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest"
import { launcherService } from "./launcherService"

const { mockDesktopGetState, mockProcessGetState, mockWindowGetState } = vi.hoisted(() => ({
  mockDesktopGetState: vi.fn(),
  mockProcessGetState: vi.fn(),
  mockWindowGetState: vi.fn(),
}))

vi.mock("@features/environments/desktop/store/useDesktopStore", () => ({
  useDesktopStore: { getState: mockDesktopGetState },
}))

vi.mock("@features/window/store/useWindowStore", () => ({
  useWindowStore: { getState: mockWindowGetState },
}))

vi.mock("@core/store/useProcessStore", () => ({
  useProcessStore: { getState: mockProcessGetState },
}))

import { getProgramMeta } from "@features/program/registry"
import { overlayService } from "@core/services/overlayService"
import { processService } from "@core/services/processService"

vi.mock("@features/program/registry")
vi.mock("@core/services/overlayService")
vi.mock("@core/services/processService")
vi.mock("@core/services/osService", () => ({
  osService: { isDesktop: () => true },
}))

describe("launcherService", () => {
  const selectLauncherSpy = vi.fn()
  const setLastActionIdSpy = vi.fn()
  const focusWindowSpy = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(getProgramMeta).mockReturnValue({
      id: "browser",
      runnable: true,
      allowMultipleInstances: false,
    } as any)

    mockDesktopGetState.mockReturnValue({
      selectLauncher: selectLauncherSpy,
      setLastActionId: setLastActionIdSpy,
      lastActionId: null,
      lastActionTimestamp: 0,
    })

    mockProcessGetState.mockReturnValue({
      processesByProgramId: {},
    })

    mockWindowGetState.mockReturnValue({
      focusWindow: focusWindowSpy,
    })
  })

  it("should focus existing window if multiple instances are NOT allowed", () => {
    vi.mocked(getProgramMeta).mockReturnValue({
      id: "singleton-app",
      runnable: true,
      allowMultipleInstances: false,
    } as any)

    mockProcessGetState.mockReturnValue({
      processesByProgramId: {
        "singleton-app": [
          { displayId: "window-123", launcher: { target: { type: "program", args: {} } } },
        ],
      },
    })

    launcherService.openLauncher({ target: { type: "program", programId: "singleton-app" } } as any)

    expect(focusWindowSpy).toHaveBeenCalledWith("window-123")
    expect(processService.startProcess).not.toHaveBeenCalled()
  })

  describe("handleLauncherClick", () => {
    const mockMeta = {
      target: { type: "program", programId: "app" },
      disabled: false,
    }

    const createEvent = (type: string) =>
      ({
        stopPropagation: vi.fn(),
        button: 0,
        clientX: 50,
        clientY: 50,
        type,
      }) as any

    it("should only select and hide overlay on pointerdown", () => {
      launcherService.handleLauncherClick(
        createEvent("pointerdown"),
        mockMeta as any,
        "id-1",
        "desktop" as any,
      )

      expect(selectLauncherSpy).toHaveBeenCalledWith("id-1")
      expect(overlayService.hideOverlay).toHaveBeenCalled()
    })

    it("should execute double-click logic on pointerup", () => {
      mockDesktopGetState.mockReturnValue({
        selectLauncher: selectLauncherSpy,
        setLastActionId: setLastActionIdSpy,
        lastActionId: "id-1",
        lastActionTimestamp: Date.now(),
      })

      const spyOpen = vi.spyOn(launcherService, "openLauncher").mockImplementation(() => {})

      launcherService.handleLauncherClick(
        createEvent("pointerup"),
        mockMeta as any,
        "id-1",
        "desktop" as any,
      )

      expect(spyOpen).toHaveBeenCalled()
      expect(setLastActionIdSpy).toHaveBeenCalledWith("id-1")
    })
  })
})
