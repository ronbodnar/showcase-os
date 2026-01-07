import { describe, it, expect, vi, beforeEach } from "vitest"
import { appCardService } from "./appCardService"

// 1. Hoist the mock function
const { mockV4 } = vi.hoisted(() => ({
  mockV4: vi.fn(() => "mocked-uuid"),
}))

// 2. Setup the mock factory
vi.mock("uuid", () => ({
  v4: mockV4,
}))

describe("appCardService", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should create an app card with provided title and processId", () => {
    const result = appCardService.createAppCard(101, "Settings")

    expect(result).toEqual({
      id: "mocked-uuid",
      title: "Settings",
      processId: 101,
      active: true,
    })
    expect(mockV4).toHaveBeenCalled()
  })

  it("should use 'Untitled' as a fallback title", () => {
    const result = appCardService.createAppCard(102)

    expect(result.title).toBe("Untitled")
  })

  it("should generate unique ids when called multiple times", () => {
    mockV4.mockReturnValueOnce("uuid-1").mockReturnValueOnce("uuid-2")

    const card1 = appCardService.createAppCard(1)
    const card2 = appCardService.createAppCard(2)

    expect(card1.id).toBe("uuid-1")
    expect(card2.id).toBe("uuid-2")
  })
})
