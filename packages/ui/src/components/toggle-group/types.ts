/**
 * Type definitions for the ToggleGroup component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the ToggleGroup component
 *
 * @public
 * @interface
 */
export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
