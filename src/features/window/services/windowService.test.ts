/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest"
import { windowService } from "./windowService"
import { useGridStore } from "@features/grid/store/useGridStore"
import { useWindowStore } from "../store/useWindowStore"
import { processService } from "@core/services/processService"
import { osService } from "@core/services/osService"
import { useDesktopStore } from "@features/environments/desktop/store/useDesktopStore"
import { useProcessStore } from "@core/store/useProcessStore"

vi.mock("@core/services/osService")
vi.mock("@core/services/processService")

describe("windowService", () => {
  const MOCK_HOME_SIZE = { width: 1000, height: 800 }

  beforeEach(() => {
    vi.clearAllMocks()
    // Setup the mandatory "home" grid for all window calculations
    useGridStore.setState({
      grids: {
        home: { id: "home", size: MOCK_HOME_SIZE, rows: 10, cols: 10 } as any,
      },
    })
    useWindowStore.setState({ windows: {}, zOrder: [] })
  })

  describe("createWindow", () => {
    it("should center a window by default using percentage-based spawn size", () => {
      vi.mocked(osService.isDesktop).mockReturnValue(true)

      const win = windowService.createWindow(123, {
        spawn: { size: { width: 0.5, height: 0.5, unit: "%" } },
      })

      // 50% of 1000 = 500. Centered: (1000 - 500) / 2 = 250
      expect(win.size.width).toBe(500)
      expect(win.position.x).toBe(250)
      expect(win.position.y).toBe(200)
    })

    it("should respect anchors (e.g., bottom-right)", () => {
      vi.mocked(osService.isDesktop).mockReturnValue(true)

      const win = windowService.createWindow(123, {
        anchor: "bottom-right",
        spawn: { size: { width: 400, height: 300, unit: "px" } },
      })

      expect(win.position.x).toBe(1000 - 400) // 600
      expect(win.position.y).toBe(800 - 300) // 500
    })

    it("should force full-screen dimensions when not on desktop (Mobile Mode)", () => {
      vi.mocked(osService.isDesktop).mockReturnValue(false)

      const win = windowService.createWindow(123, undefined)

      expect(win.size.width).toBe(MOCK_HOME_SIZE.width)
      expect(win.position.x).toBe(0)
      expect(win.position.y).toBe(28) // The defined mobile offset
    })
  })

  describe("closeWindow", () => {
    it("should remove the window and terminate the associated process", () => {
      const windowId = "window:123"
      useWindowStore.setState({
        windows: { [windowId]: { id: windowId, processId: 123 } } as any,
      })

      windowService.closeWindow(windowId)

      expect(processService.stopProcess).toHaveBeenCalledWith(123)
      expect(useWindowStore.getState().windows[windowId]).toBeUndefined()
    })
  })

  describe("reconcileWindowPositions", () => {
    it("should scale window position and size proportionally when grid resizes", () => {
      const windowId = "window:1"
      const initialPos = { x: 100, y: 100 }
      const initialSize = { width: 200, height: 200 }

      useWindowStore.setState({
        windows: { [windowId]: { position: initialPos, size: initialSize } } as any,
      })

      // Old size was 1000x800. New size is 2000x1600 (2x scale)
      useGridStore.setState({
        grids: { home: { size: { width: 2000, height: 1600 } } } as any,
      })

      windowService.reconcileWindowPositions(MOCK_HOME_SIZE)

      const updatedWin = useWindowStore.getState().windows[windowId]
      expect(updatedWin.position).toEqual({ x: 200, y: 200 })
      expect(updatedWin.size).toEqual({ width: 400, height: 400 })
    })
  })

  describe("windowService.tryCloseEphemeralWindow", () => {
    it("should successfully close the ephemeral window when clicking outside", () => {
      const targetId = "window:ephemeral"
      const targetProcessId = 99
      const windowSize = { width: 100, height: 100 }
      const windowPos = { x: 10, y: 10 }

      useWindowStore.setState({
        windows: {
          [targetId]: {
            id: targetId,
            processId: targetProcessId,
            size: windowSize,
            position: windowPos,
          } as any,
        },
      })

      useDesktopStore.setState({ ephemeralWindowId: targetId })

      const removeWindowSpy = vi.spyOn(useWindowStore.getState(), "removeWindow")
      const removeProcessSpy = vi.spyOn(useProcessStore.getState(), "removeProcess")

      const result = windowService.tryCloseEphemeralWindow({ x: 200, y: 200 })

      expect(result).toBe(true)
      expect(removeWindowSpy).toHaveBeenCalledWith(targetId)
      expect(removeProcessSpy).toHaveBeenCalledWith(targetProcessId)
      expect(useDesktopStore.getState().ephemeralWindowId).toBeUndefined()
    })

    it("should NOT close the window when clicking inside", () => {
      const targetId = "window:ephemeral"
      useWindowStore.setState({
        windows: {
          [targetId]: {
            id: targetId,
            size: { width: 100, height: 100 },
            position: { x: 0, y: 0 },
          } as any,
        },
      })
      useDesktopStore.setState({ ephemeralWindowId: targetId })

      const result = windowService.tryCloseEphemeralWindow({ x: 50, y: 50 })

      expect(result).toBe(false)
      expect(useDesktopStore.getState().ephemeralWindowId).toBe(targetId)
    })
  })
})
