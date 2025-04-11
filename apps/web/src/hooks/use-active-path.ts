"use client"

import { usePathname } from "next/navigation"
import { useCallback } from "react"

/**
 * Options for the useActivePath hook
 * @interface UseActivePathOptions
 */
export interface UseActivePathOptions {
  /**
   * Whether to match exact paths only
   * If false, will match if the current path starts with the given path
   */
  exact?: boolean
}

/**
 * Hook to check if a path is active based on the current pathname
 *
 * @example
 * ```tsx
 * const isActive = useActivePath();
 *
 * // In a component
 * <NavItem href="/dashboard" isActive={isActive("/dashboard")}>Dashboard</NavItem>
 *
 * // With nested routes (non-exact matching)
 * <NavItem href="/settings" isActive={isActive("/settings", { exact: false })}>Settings</NavItem>
 * ```
 *
 * @returns A function that checks if a path is active
 */
export function useActivePath() {
  const pathname = usePathname()

  return useCallback(
    (path: string, options?: UseActivePathOptions) => {
      // Default exact to true if options is undefined
      const { exact = true } = options || {}

      // Normalize paths by removing trailing slashes
      const normalizedPathname = pathname?.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname
      const normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path

      if (exact) {
        return normalizedPathname === normalizedPath
      }

      return (
        normalizedPathname === normalizedPath ||
        normalizedPathname.startsWith(`${normalizedPath}/`)
      )
    },
    [pathname]
  )
}
