/**
 * Type definitions for the NavigationMenu component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the NavigationMenu component
 *
 * @public
 * @interface
 */
export interface NavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
