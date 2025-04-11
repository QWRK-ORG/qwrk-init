/**
 * Type definitions for the Chart component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Chart component
 *
 * @public
 * @interface
 */
export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
