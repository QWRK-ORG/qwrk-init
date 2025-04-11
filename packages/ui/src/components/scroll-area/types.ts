/**
 * Type definitions for the ScrollArea component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the ScrollArea component
 *
 * @public
 * @interface
 */
export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
