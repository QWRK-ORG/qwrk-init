/**
 * Type definitions for the RadioGroup component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the RadioGroup component
 *
 * @public
 * @interface
 */
export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
