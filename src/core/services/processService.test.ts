/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest"
import { processService } from "./processService"

const { mockProcessGetState, mockWindowGetState, mockAppStackGetState } = vi.hoisted(() => ({
  mockProcessGetState: vi.fn(),
  mockWindowGetState: vi.fn(),
  mockAppStackGetState: vi.fn(),
}))

vi.mock("@core/store/useProcessStore", () => ({
  useProcessStore: { getState: mockProcessGetState },
}))

vi.mock("@features/window/store/useWindowStore", () => ({
  useWindowStore: { getState: mockWindowGetState },
}))

vi.mock("@core/store/useAppStackStore", () => ({
  useAppStackStore: { getState: mockAppStackGetState },
}))

import { osService } from "./osService"
import { windowService } from "@features/window/services/windowService"
import { appCardService } from "@features/app-card/services/appCardService"
import { panelService } from "./panelService"
import { getProgramMeta } from "@features/program/registry"
import { launcherService } from "@features/launcher/services/launcherService"

vi.mock("./osService")
vi.mock("./panelService")
vi.mock("@features/window/services/windowService")
vi.mock("@features/app-card/services/appCardService")
vi.mock("@features/program/registry")
vi.mock("@features/launcher/services/launcherService")

vi.mock("@features/launcher/types", () => ({
  isLauncherProgramTarget: (t: any) => t?.type === "program",
}))

describe("processService", () => {
  const addProcessSpy = vi.fn()
  const addWindowSpy = vi.fn()
  const removeWindowSpy = vi.fn()
  const addAppCardSpy = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    mockProcessGetState.mockReturnValue({
      getNextProcessId: () => 101,
      addProcess: addProcessSpy,
      processes: {},
      processesByProgramId: {},
      removeProcess: vi.fn(),
    })

    mockWindowGetState.mockReturnValue({
      addWindow: addWindowSpy,
      removeWindow: removeWindowSpy,
    })

    mockAppStackGetState.mockReturnValue({
      addAppCard: addAppCardSpy,
    })

    vi.mocked(osService.isDesktop).mockReturnValue(true)
    vi.mocked(getProgramMeta).mockReturnValue({
      name: "Test App",
      runnable: true,
      window: { isEphemeral: false },
    } as any)
  })

  describe("startProcess", () => {
    const mockLauncher = {
      target: { type: "program", programId: "browser", args: {} },
    }

    it("should start a windowed process when on desktop", () => {
      vi.mocked(windowService.createWindow).mockReturnValue({ id: "win-1" } as any)

      processService.startProcess(mockLauncher as any)

      expect(windowService.createWindow).toHaveBeenCalled()
      expect(addProcessSpy).toHaveBeenCalledWith(101, mockLauncher, "win-1")
      expect(panelService.addLauncher).toHaveBeenCalled()
    })

    it("should start an app card and handle mobile history", () => {
      vi.mocked(osService.isDesktop).mockReturnValue(false)
      vi.mocked(appCardService.createAppCard).mockReturnValue({ id: "card-1" } as any)
      const historySpy = vi.spyOn(window.history, "pushState").mockImplementation(() => {})

      processService.startProcess(mockLauncher as any)

      expect(addAppCardSpy).toHaveBeenCalled()
      expect(historySpy).toHaveBeenCalledWith({ processRunning: true }, "")

      historySpy.mockRestore()
    })

    it("should abort if the program is not runnable", () => {
      vi.mocked(getProgramMeta).mockReturnValue({ runnable: false } as any)

      processService.startProcess(mockLauncher as any)

      expect(addProcessSpy).not.toHaveBeenCalled()
    })
  })

  describe("stopProcess", () => {
    it("should clean up and remove from panel if last instance", () => {
      vi.mocked(osService.isDesktop).mockReturnValue(true)

      mockProcessGetState.mockReturnValue({
        processes: { 101: { programId: "browser", displayId: "win-1" } },
        processesByProgramId: { browser: [{ id: 101 }] },
        removeProcess: vi.fn(),
      })

      processService.stopProcess(101)

      expect(removeWindowSpy).toHaveBeenCalledWith("win-1")
      expect(launcherService.removeFromGridWithProgramId).toHaveBeenCalledWith(
        "panel",
        "browser",
        true,
      )
    })
  })
})
