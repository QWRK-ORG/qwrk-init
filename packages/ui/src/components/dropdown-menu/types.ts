/**
 * Type definitions for the DropdownMenu component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the DropdownMenu component
 *
 * @public
 * @interface
 */
export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
