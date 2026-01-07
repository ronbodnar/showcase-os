/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest"
import { panelService } from "@core/services/panelService"

const { mockLauncherGetState, mockProcessGetState } = vi.hoisted(() => ({
  mockLauncherGetState: vi.fn(),
  mockProcessGetState: vi.fn(),
}))

vi.mock("@features/launcher/store/useLauncherStore", () => ({
  useLauncherStore: { getState: mockLauncherGetState },
}))

vi.mock("@core/store/useProcessStore", () => ({
  useProcessStore: { getState: mockProcessGetState },
}))

import { launcherService } from "@features/launcher/services/launcherService"
vi.mock("@features/launcher/services/launcherService")
vi.mock("uuid", () => ({ v4: vi.fn(() => "mocked-uuid") }))

vi.mock("@features/launcher/utils/launcher.utils", () => ({
  sameProgramTarget: (a: any, b: any) => a?.programId === b?.programId && a?.type === "program",
  sameActionTarget: (a: any, b: any) => a?.action === b?.action && a?.type === "action",
  getProgramMetaFromTarget: (t: any) => (t?.programId ? { id: t.programId } : null),
}))

vi.mock("@features/launcher/types", () => ({
  isLauncherActionTarget: (t: any) => t?.type === "action",
}))

describe("panelService", () => {
  const addLauncherSpy = vi.fn()
  const updateLauncherSpy = vi.fn()
  const removeLauncherSpy = vi.fn()
  const reorderSpy = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Default return for Launcher Store
    mockLauncherGetState.mockReturnValue({
      addLauncher: addLauncherSpy,
      updateLauncher: updateLauncherSpy,
      removeLauncher: removeLauncherSpy,
      reorderLaunchersAfterRemoval: reorderSpy,
      launchersById: {},
      launchersByGrid: { panel: [] },
    })

    // Default return for Process Store
    mockProcessGetState.mockReturnValue({
      processesByProgramId: {},
    })
  })

  describe("addLauncherById", () => {
    it("should trigger addLauncher if ID exists in store", () => {
      const mockLauncher = { meta: { target: { type: "program", programId: "test" } } }

      mockLauncherGetState.mockReturnValue({
        launchersById: { "id-123": mockLauncher },
        launchersByGrid: { panel: [] },
        addLauncher: addLauncherSpy,
      })

      panelService.addLauncherById("id-123", true)
      expect(addLauncherSpy).toHaveBeenCalled()
    })
  })

  describe("addLauncher", () => {
    it("should update and set isPinned to true only if passed as true", () => {
      const meta = { target: { type: "program", programId: "browser" } }
      const existing = {
        id: "existing-1",
        meta,
        displayIds: [],
        isPinned: false,
      }

      mockLauncherGetState.mockReturnValue({
        updateLauncher: updateLauncherSpy,
        launchersByGrid: { panel: [existing] },
      })

      panelService.addLauncher(meta as any, true)

      expect(updateLauncherSpy).toHaveBeenCalledWith(
        "panel",
        expect.objectContaining({ isPinned: true }),
      )
    })
  })

  describe("unpinLauncher", () => {
    it("should call launcherService.removeFromGridWithProgramId when no processes exist", () => {
      const progLauncher = {
        id: "prog-1",
        position: 2,
        meta: { target: { type: "program", programId: "notepad" } },
      }

      mockLauncherGetState.mockReturnValue({
        launchersByGrid: { panel: [progLauncher] },
        updateLauncher: updateLauncherSpy,
      })

      mockProcessGetState.mockReturnValue({
        processesByProgramId: { notepad: [] },
      })

      panelService.unpinLauncher("prog-1")

      expect(launcherService.removeFromGridWithProgramId).toHaveBeenCalledWith(
        "panel",
        "notepad",
        true,
      )
    })

    it("should update existing launcher with isPinned false if processes are running", () => {
      const progLauncher = {
        id: "prog-1",
        isPinned: true,
        meta: { target: { type: "program", programId: "notepad" } },
      }

      mockLauncherGetState.mockReturnValue({
        launchersByGrid: { panel: [progLauncher] },
        updateLauncher: updateLauncherSpy,
      })

      mockProcessGetState.mockReturnValue({
        processesByProgramId: { notepad: [{ id: "proc-1" }] },
      })

      panelService.unpinLauncher("prog-1")

      expect(updateLauncherSpy).toHaveBeenCalledWith(
        "panel",
        expect.objectContaining({ id: "prog-1", isPinned: false }),
      )
    })
  })
})
