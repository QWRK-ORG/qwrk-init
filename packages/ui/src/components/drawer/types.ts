/**
 * Type definitions for the Drawer component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Drawer component
 *
 * @public
 * @interface
 */
export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
