import { render as rtlRender } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import type { ReactElement } from "react"
import { vi } from "vitest"

// Add an explicit type for the render function result
type RenderResult = ReturnType<typeof rtlRender> & {
    user: ReturnType<typeof userEvent.setup>
}

/**
 * Custom render function that includes common providers
 * @param ui - The React element to render
 * @param options - Additional render options
 * @returns The rendered component and utilities
 */
function render(ui: ReactElement, options: Record<string, unknown> = {}): RenderResult {
    const user = userEvent.setup()
    return {
        user,
        ...rtlRender(ui, {
            ...options
        })
    } as RenderResult
}

/**
 * Mock Next.js navigation hooks
 */
vi.mock("next/navigation", () => ({
    usePathname: vi.fn(() => "/"),
    useRouter: vi.fn(() => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn()
    })),
    useSearchParams: vi.fn(() => ({
        get: vi.fn(),
        toString: vi.fn(() => "")
    }))
}))

export * from "@testing-library/react"
export { render, userEvent, vi }
