/**
 * Type definitions for the Sheet component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Sheet component
 *
 * @public
 * @interface
 */
export interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
