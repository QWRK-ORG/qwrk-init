/**
 * Type definitions for the DatePicker component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the DatePicker component
 *
 * @public
 * @interface
 */
export interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
