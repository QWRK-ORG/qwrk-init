/**
 * Type definitions for the Badge component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Badge component
 *
 * @public
 * @interface
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
