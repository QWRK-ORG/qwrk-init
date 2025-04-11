/**
 * Type definitions for the Command component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Command component
 *
 * @public
 * @interface
 */
export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
