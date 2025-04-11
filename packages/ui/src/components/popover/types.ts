/**
 * Type definitions for the Popover component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Popover component
 *
 * @public
 * @interface
 */
export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
