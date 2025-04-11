/**
 * Type definitions for the Pagination component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Pagination component
 *
 * @public
 * @interface
 */
export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
