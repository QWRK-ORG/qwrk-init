import { renderHook } from "@testing-library/react"
import { type ReadonlyURLSearchParams, usePathname, useSearchParams } from "next/navigation"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { useNavigationAnalytics } from "./use-navigation-analytics"

// Mock the Next.js navigation hooks
vi.mock("next/navigation", () => ({
    usePathname: vi.fn(),
    useSearchParams: vi.fn(() => ({
        toString: vi.fn()
    }))
}))

describe("useNavigationAnalytics", () => {
    const onNavigateMock = vi.fn()

    beforeEach(() => {
        vi.resetAllMocks()
        vi.mocked(usePathname).mockReturnValue("/dashboard")
        vi.mocked(useSearchParams).mockReturnValue({
            toString: vi.fn().mockReturnValue("")
        } as unknown as ReadonlyURLSearchParams)
    })

    it("calls onNavigate on initial render when trackInitialPageLoad is true", () => {
        renderHook(() =>
            useNavigationAnalytics({
                onNavigate: onNavigateMock,
                trackInitialPageLoad: true
            })
        )

        expect(onNavigateMock).toHaveBeenCalledTimes(1)
        expect(onNavigateMock).toHaveBeenCalledWith("/dashboard", undefined)
    })

    it("does not call onNavigate on initial render when trackInitialPageLoad is false", () => {
        renderHook(() =>
            useNavigationAnalytics({
                onNavigate: onNavigateMock,
                trackInitialPageLoad: false
            })
        )

        expect(onNavigateMock).not.toHaveBeenCalled()
    })

    it("calls onNavigate when pathname changes", () => {
        const { rerender } = renderHook(() =>
            useNavigationAnalytics({
                onNavigate: onNavigateMock
            })
        )

        // Initial render
        expect(onNavigateMock).toHaveBeenCalledTimes(1)

        // Change pathname
        vi.mocked(usePathname).mockReturnValue("/settings")
        rerender()

        // Should be called again with new path and previous path
        expect(onNavigateMock).toHaveBeenCalledTimes(2)
        expect(onNavigateMock).toHaveBeenLastCalledWith("/settings", "/dashboard")
    })

    it("includes search params when includeSearchParams is true", () => {
        vi.mocked(useSearchParams).mockReturnValue({
            toString: vi.fn().mockReturnValue("query=test")
        } as unknown as ReadonlyURLSearchParams)

        renderHook(() =>
            useNavigationAnalytics({
                onNavigate: onNavigateMock,
                includeSearchParams: true
            })
        )

        expect(onNavigateMock).toHaveBeenCalledWith("/dashboard?query=test", undefined)
    })

    it("does not include search params when includeSearchParams is false", () => {
        vi.mocked(useSearchParams).mockReturnValue({
            toString: vi.fn().mockReturnValue("query=test")
        } as unknown as ReadonlyURLSearchParams)

        renderHook(() =>
            useNavigationAnalytics({
                onNavigate: onNavigateMock,
                includeSearchParams: false
            })
        )

        expect(onNavigateMock).toHaveBeenCalledWith("/dashboard", undefined)
    })
})
