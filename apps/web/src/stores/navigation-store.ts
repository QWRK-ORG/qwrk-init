import { create } from "zustand"

/**
 * Navigation state interface
 * @interface NavigationState
 */
interface NavigationState {
    /** Current breadcrumbs items */
    breadcrumbs: Array<{ href?: string; label: string }>
    /** Set the current breadcrumbs */
    setBreadcrumbs: (items: Array<{ href?: string; label: string }>) => void

    /** Currently active navigation item path */
    activeNavPath: string | null
    /** Set the active navigation item by path */
    setActiveNavPath: (path: string) => void

    /** Whether the mobile navigation menu is open */
    isMobileNavOpen: boolean
    /** Open the mobile navigation menu */
    openMobileNav: () => void
    /** Close the mobile navigation menu */
    closeMobileNav: () => void
    /** Toggle the mobile navigation menu */
    toggleMobileNav: () => void
}

/**
 * Navigation store hook
 * Use this hook to access and update navigation state
 *
 * @example
 * // To use breadcrumbs in a component:
 * const { breadcrumbs, setBreadcrumbs } = useNavigationStore();
 *
 * // Only subscribe to what you need:
 * const setBreadcrumbs = useNavigationStore(state => state.setBreadcrumbs);
 */
export const useNavigationStore = create<NavigationState>((set) => ({
    // Breadcrumbs state
    breadcrumbs: [],
    setBreadcrumbs: (items) => set({ breadcrumbs: items }),

    // Active navigation path
    activeNavPath: null,
    setActiveNavPath: (path) => set({ activeNavPath: path }),

    // Mobile navigation state
    isMobileNavOpen: false,
    openMobileNav: () => set({ isMobileNavOpen: true }),
    closeMobileNav: () => set({ isMobileNavOpen: false }),
    toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen }))
}))
