/**
 * Type definitions for the Checkbox component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Checkbox component
 *
 * @public
 * @interface
 */
export interface CheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
