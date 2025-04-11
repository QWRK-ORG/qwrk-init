/**
 * Type definitions for the Form component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Form component
 *
 * @public
 * @interface
 */
export interface FormProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
