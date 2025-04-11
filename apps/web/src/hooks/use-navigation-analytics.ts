"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

/**
 * Navigation analytics options
 * @interface UseNavigationAnalyticsOptions
 */
export interface UseNavigationAnalyticsOptions {
    /**
     * Function to call when navigation occurs
     * @param url - The current URL
     * @param prevUrl - The previous URL (undefined on first render)
     */
    onNavigate: (url: string, prevUrl?: string) => void
    /** Whether to include search params in the URL */
    includeSearchParams?: boolean
    /** Whether to track the initial page load */
    trackInitialPageLoad?: boolean
}

/**
 * Hook to track navigation changes for analytics
 *
 * NOTE: Components using this hook must be wrapped in a Suspense boundary
 * because it uses useSearchParams() internally.
 *
 * @example
 * ```tsx
 * // Basic usage with Suspense
 * <Suspense fallback={<div>Loading...</div>}>
 *   <NavigationTracker />
 * </Suspense>
 *
 * // NavigationTracker component
 * function NavigationTracker() {
 *   useNavigationAnalytics({
 *     onNavigate: (url) => {
 *       console.log(`Navigated to: ${url}`);
 *       // Send to analytics service
 *       analytics.pageView(url);
 *     }
 *   });
 *   return null;
 * }
 * ```
 */
export function useNavigationAnalytics({
    onNavigate,
    includeSearchParams = false,
    trackInitialPageLoad = true
}: UseNavigationAnalyticsOptions) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const prevUrlRef = useRef<string>()

    useEffect(() => {
        const url =
            includeSearchParams && searchParams.toString()
                ? `${pathname}?${searchParams.toString()}`
                : pathname

        // Skip initial page load if not tracking it
        if (!trackInitialPageLoad && prevUrlRef.current === undefined) {
            prevUrlRef.current = url
            return
        }

        // Call the onNavigate callback with current and previous URLs
        onNavigate(url, prevUrlRef.current)

        // Update the previous URL
        prevUrlRef.current = url
    }, [pathname, searchParams, onNavigate, includeSearchParams, trackInitialPageLoad])
}
