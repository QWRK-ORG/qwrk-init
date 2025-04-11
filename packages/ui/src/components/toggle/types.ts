/**
 * Type definitions for the Toggle component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Toggle component
 *
 * @public
 * @interface
 */
export interface ToggleProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
