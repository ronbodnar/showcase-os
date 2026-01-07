/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach, vi } from "vitest"
import { gridService } from "./gridService"
import { useGridStore } from "@features/grid/store/useGridStore"
import { useLauncherStore } from "@features/launcher/store/useLauncherStore"

vi.mock("uuid", () => ({
  v4: () => "test-uuid-123",
}))

vi.mock("@shared/utils/utils", () => ({
  debugMessage: vi.fn(),
}))

describe("gridService", () => {
  beforeEach(() => {
    useGridStore.getState().reset()
    useLauncherStore.getState().reset()
    vi.clearAllMocks()
  })

  describe("initializeLaunchers", () => {
    it("should remove unpinned launchers and reset empty grids", () => {
      const gridId = "home"
      useGridStore.setState({
        grids: { [gridId]: { id: gridId, rows: 5, cols: 5 } } as any,
      })

      const pinnedLauncher = { id: "l1", isPinned: true, position: { x: 0, y: 0 } }
      const unpinnedLauncher = { id: "l2", isPinned: false, position: { x: 1, y: 1 } }

      const removeLauncherSpy = vi.fn()
      useLauncherStore.setState({
        launchersByGrid: { [gridId]: [pinnedLauncher, unpinnedLauncher] },
        removeLauncher: removeLauncherSpy,
      } as any)

      gridService.initializeLaunchers()

      expect(removeLauncherSpy).toHaveBeenCalledWith(gridId, "l2")
      expect(removeLauncherSpy).not.toHaveBeenCalledWith(gridId, "l1")
    })
  })

  describe("reconcileLauncherPositions", () => {
    it("should move launchers back into bounds when grid shrinks", () => {
      const gridId = "home"
      const moveLauncherSpy = vi.fn()

      const launcher = { id: "l1", position: { x: 5, y: 5 } }

      useLauncherStore.setState({
        launchersByGrid: { [gridId]: [launcher] },
        moveLauncher: moveLauncherSpy,
      } as any)

      gridService.reconcileLauncherPositions(gridId, 3, 3)

      expect(moveLauncherSpy).toHaveBeenCalled()
      const lastCall = moveLauncherSpy.mock.calls[0]
      expect(lastCall[2].x).toBeLessThan(3)
      expect(lastCall[2].y).toBeLessThan(3)
    })

    it("should respect occupied spots when moving launchers", () => {
      const gridId = "home"
      const moveLauncherSpy = vi.fn()

      // L1 is at (4, 0), L2 is at (3, 0).
      // We shrink grid width to 4. L1 must move to (3,0), but L2 is there.
      const l1 = { id: "l1", position: { x: 4, y: 0 } }
      const l2 = { id: "l2", position: { x: 3, y: 0 } }

      useLauncherStore.setState({
        launchersByGrid: { [gridId]: [l1, l2] },
        moveLauncher: moveLauncherSpy,
      } as any)

      gridService.reconcileLauncherPositions(gridId, 10, 4)

      // L1 should find the next available spot, not (3,0)
      const l1Move = moveLauncherSpy.mock.calls.find((call) => call[1].x === 4)
      expect(l1Move![2].x).toBeLessThan(3)
    })
  })

  describe("addLauncher", () => {
    it("should add a launcher at the first available position", () => {
      const gridId = "home"
      const addLauncherSpy = vi.fn()

      useGridStore.setState({
        grids: { [gridId]: { id: gridId, rows: 2, cols: 2, layoutDirection: "horizontal" } } as any,
      })

      const existingLauncher = { id: "ex", position: { x: 0, y: 0 } }
      useLauncherStore.setState({
        launchersByGrid: { [gridId]: [existingLauncher] },
        addLauncher: addLauncherSpy,
      } as any)

      gridService.addLauncher(gridId, { type: "app", name: "Test" } as any)

      expect(addLauncherSpy).toHaveBeenCalledWith(
        gridId,
        expect.objectContaining({
          id: "test-uuid-123",
          position: { x: 1, y: 0 },
        }),
      )
    })

    it("should prevent adding launcher if grid is full", () => {
      const gridId = "home"
      const addLauncherSpy = vi.fn()

      useGridStore.setState({
        grids: { [gridId]: { id: gridId, rows: 1, cols: 1 } } as any,
      })

      useLauncherStore.setState({
        launchersByGrid: { [gridId]: [{ id: "l1", position: { x: 0, y: 0 } }] },
        addLauncher: addLauncherSpy,
      } as any)

      gridService.addLauncher(gridId, {} as any)

      expect(addLauncherSpy).not.toHaveBeenCalled()
    })
  })
})
