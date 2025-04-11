import { renderHook } from "@testing-library/react"
import { usePathname } from "next/navigation"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { useActivePath } from "./use-active-path"

// Mock the usePathname hook
vi.mock("next/navigation", () => ({
  usePathname: vi.fn()
}))

describe("useActivePath", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("returns true for exact match when exact=true", () => {
    // Mock the current path
    vi.mocked(usePathname).mockReturnValue("/dashboard")

    const { result } = renderHook(() => useActivePath())

    // Test exact match
    expect(result.current("/dashboard", { exact: true })).toBe(true)

    // Test non-match
    expect(result.current("/settings", { exact: true })).toBe(false)
  })

  it("returns true for parent path when exact=false", () => {
    // Mock the current path to be a nested route
    vi.mocked(usePathname).mockReturnValue("/settings/profile")

    const { result } = renderHook(() => useActivePath())

    // Test parent path match
    expect(result.current("/settings", { exact: false })).toBe(true)

    // Test non-parent path
    expect(result.current("/dashboard", { exact: false })).toBe(false)
  })

  it("defaults to exact=true when not specified", () => {
    // Mock the current path
    vi.mocked(usePathname).mockReturnValue("/settings/profile")

    const { result } = renderHook(() => useActivePath())

    // Should not match parent path with default options
    expect(result.current("/settings")).toBe(false)

    // Should match exact path
    vi.mocked(usePathname).mockReturnValue("/dashboard")
    const { result: result2 } = renderHook(() => useActivePath())
    expect(result2.current("/dashboard")).toBe(true)
  })

  it("handles trailing slashes correctly", () => {
    // Mock the current path with trailing slash
    vi.mocked(usePathname).mockReturnValue("/dashboard/")

    const { result } = renderHook(() => useActivePath())

    // Should match path without trailing slash
    expect(result.current("/dashboard")).toBe(true)
  })
})
