export * from "./app-layout"
export * from "./breadcrumbs"
export * from "./mobile-nav"
export * from "./mobile-sidebar"
export * from "./nav-link-item"
export * from "./navigation-wrapper"
export * from "./page-header"
export * from "./page-wrapper"
export * from "./role-based-nav"
export * from "./sidebar-nav"
export * from "./top-nav"

/**
 * Navigation Components
 *
 * This module provides a comprehensive set of navigation components for building
 * consistent and accessible navigation systems in Next.js applications.
 *
 * Key components:
 * - AppLayout: Combined top navigation and sidebar layout
 * - Breadcrumbs: Hierarchical navigation path
 * - MobileNav: Mobile-friendly navigation drawer
 * - NavLinkItem: Base navigation link component
 * - PageHeader: Page title, description and actions
 * - SidebarNav: Vertical navigation menu with support for nested items
 * - TopNav: Horizontal navigation bar
 *
 * Usage example:
 * ```tsx
 * import { TopNav, Breadcrumbs, PageHeader } from "@/components/navigation"
 *
 * export default function Layout({ children }) {
 *   return (
 *     <>
 *       <TopNav {...topNavProps} />
 *       <main>
 *         <Breadcrumbs items={breadcrumbItems} />
 *         <PageHeader title="Dashboard" />
 *         {children}
 *       </main>
 *     </>
 *   )
 * }
 * ```
 */
