/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { programService } from "./programService"

const { mockRegistry } = vi.hoisted(() => ({
  mockRegistry: {
    "static-app": { component: () => React.createElement("div", null, "Static") },
    "lazy-app": {
      loader: () => Promise.resolve({ default: () => React.createElement("div", null, "Lazy") }),
    },
  },
}))

vi.mock("@features/program/components", () => ({
  PROGRAM_COMPONENTS: mockRegistry,
}))

describe("programService", () => {
  beforeEach(() => {
    vi.clearAllMocks()

    const activeHandlers = ["app-1", "test-id"]
    activeHandlers.forEach((id) => programService.unregisterNavigationHandler(id))
  })

  describe("Navigation Handlers", () => {
    it("should register and retrieve a navigation handler", () => {
      const mockHandler = { canGoBack: vi.fn(() => true), goBack: vi.fn() }

      programService.registerNavigationHandler("app-1", mockHandler)
      const retrieved = programService.getNavigationHandler("app-1")

      expect(retrieved).toBe(mockHandler)
      expect(retrieved?.canGoBack()).toBe(true)
    })

    it("should remove handler on unregister", () => {
      programService.registerNavigationHandler("app-1", {
        canGoBack: () => false,
        goBack: () => {},
      })
      programService.unregisterNavigationHandler("app-1")

      expect(programService.getNavigationHandler("app-1")).toBeUndefined()
    })
  })

  describe("loadProgramComponent", () => {
    it('should return a static component immediately if defined with "component"', () => {
      const Component = programService.loadProgramComponent("static-app" as any)

      expect(Component).toBeDefined()
      // Verify it's not a React.lazy wrapper (standard functional component)
      expect((Component as any).$$typeof).not.toBe(Symbol.for("react.lazy"))
    })

    it('should return a React.lazy component if defined with a "loader"', () => {
      const Component = programService.loadProgramComponent("lazy-app" as any)

      expect(Component).toBeDefined()
      // React.lazy components have a specific $$typeof symbol
      expect((Component as any).$$typeof).toBe(Symbol.for("react.lazy"))
    })

    it("should cache the component after the first load (Idempotency)", () => {
      const firstLoad = programService.loadProgramComponent("static-app" as any)
      const secondLoad = programService.loadProgramComponent("static-app" as any)

      expect(firstLoad).toBe(secondLoad)
    })

    it("should return undefined for non-existent program IDs", () => {
      const Component = programService.loadProgramComponent("fake-id" as any)
      expect(Component).toBeUndefined()
    })
  })
})
