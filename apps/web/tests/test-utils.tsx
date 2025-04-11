import { render as rtlRender } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import type { ReactElement } from "react"
import { vi } from "vitest"

/**
 * Custom render function that includes common providers
 * @param ui - The React element to render
 * @param options - Additional render options
 * @returns The rendered component and utilities
 */
function render(
  ui: ReactElement,
  options: Record<string, unknown> = {}
): { user: ReturnType<typeof userEvent.setup> } & Omit<
  ReturnType<typeof rtlRender>,
  "rerender"
> & {
    rerender: (ui: ReactElement) => void
  } {
  const user = userEvent.setup()
  const result = {
    user,
    ...rtlRender(ui, {
      ...options
    })
  }
  return result
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
