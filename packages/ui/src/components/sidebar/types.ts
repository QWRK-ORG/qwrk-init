/**
 * Type definitions for the Sidebar component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Sidebar component
 *
 * @public
 * @interface
 */
export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
