/**
 * Type definitions for the Card component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Card component
 *
 * @public
 * @interface
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
