/**
 * Type definitions for the Table component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Table component
 *
 * @public
 * @interface
 */
export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
