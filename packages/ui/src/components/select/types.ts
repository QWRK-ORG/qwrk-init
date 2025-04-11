/**
 * Type definitions for the Select component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Select component
 *
 * @public
 * @interface
 */
export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
