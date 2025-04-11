/**
 * Type definitions for the Progress component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Progress component
 *
 * @public
 * @interface
 */
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
