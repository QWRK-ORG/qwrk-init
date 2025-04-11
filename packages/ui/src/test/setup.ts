/**
 * Testing setup file for UI components
 *
 * This file is automatically loaded before each test file by Vitest
 * through the setupFiles configuration in vitest.config.mts
 *
 * NOTE: We keep this setup file even though we've removed the shadcn component tests,
 * as it provides necessary mocks that might be needed for tests of custom components
 * or integration tests that use these UI components.
 */

import "@testing-library/jest-dom"
import { vi } from "vitest"

// Mock ResizeObserver which is used by Radix UI components
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// @ts-ignore - we're intentionally mocking this global
global.ResizeObserver = ResizeObserverMock

// Mock other browser APIs as needed that might be missing in the test environment
if (typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  })
}

// Suppress specific console errors during tests
const originalConsoleError = console.error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.error = (...args: unknown[]) => {
  // Filter out specific error messages that are expected during tests
  if (
    typeof args[0] === "string" &&
    (args[0].includes?.("Warning: ReactDOM.render is no longer supported") ||
      args[0].includes?.("React does not recognize the") ||
      args[0].includes?.("Invalid prop"))
  ) {
    return
  }
  originalConsoleError(...args)
}
