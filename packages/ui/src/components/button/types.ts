/**
 * Type definitions for the Button component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Button component
 *
 * @public
 * @interface
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
