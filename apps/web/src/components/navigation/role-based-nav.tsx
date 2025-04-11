"use client"

import type { ReactNode } from "react"
import { NavLinkItem, type NavLinkItemProps } from "./nav-link-item"

/**
 * Role-based navigation item properties
 * @interface RoleBasedNavItemProps
 */
export interface RoleBasedNavItemProps extends Omit<NavLinkItemProps, "onClick"> {
    /** Roles that can access this navigation item */
    allowedRoles?: string[]
}

/**
 * Role-based navigation properties
 * @interface RoleBasedNavProps
 */
export interface RoleBasedNavProps {
    /** Navigation items with role restrictions */
    items: RoleBasedNavItemProps[]
    /** Current user roles */
    userRoles: string[]
    /** Optional wrapper component */
    wrapper?: (children: ReactNode) => ReactNode
    /** Optional CSS classes */
    className?: string
    /** Optional CSS classes for each item */
    itemClassName?: string
}

/**
 * Role-based navigation component that only shows navigation items the user has access to
 *
 * @example
 * ```tsx
 * const navItems = [
 *   { href: "/dashboard", label: "Dashboard" }, // Everyone can see this
 *   { href: "/admin", label: "Admin", allowedRoles: ["admin"] }, // Only admins can see this
 *   { href: "/reports", label: "Reports", allowedRoles: ["admin", "manager"] }, // Admins and managers can see this
 * ];
 *
 * // In your component
 * <RoleBasedNav items={navItems} userRoles={["user"]} />
 * ```
 *
 * @param props - Component properties
 * @returns Role-based navigation component
 */
export function RoleBasedNav({
    items,
    userRoles,
    wrapper,
    className,
    itemClassName
}: RoleBasedNavProps) {
    // Filter items based on user roles
    const filteredItems = items.filter((item) => {
        // If no roles are specified, everyone can see it
        if (!item.allowedRoles || item.allowedRoles.length === 0) {
            return true
        }

        // Check if user has any of the allowed roles
        return item.allowedRoles.some((role) => userRoles.includes(role))
    })

    // If no items are visible to the user, return null
    if (filteredItems.length === 0) {
        return null
    }

    const navItems = (
        <ul className={className}>
            {filteredItems.map((item) => (
                <li key={item.href}>
                    <NavLinkItem
                        href={item.href}
                        label={item.label}
                        isActive={item.isActive}
                        icon={item.icon}
                        className={itemClassName}
                    />
                </li>
            ))}
        </ul>
    )

    // If a wrapper is provided, wrap the items
    if (wrapper) {
        return wrapper(navItems)
    }

    return navItems
}
