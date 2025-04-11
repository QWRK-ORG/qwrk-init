/**
 * Type definitions for the Label component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Label component
 *
 * @public
 * @interface
 */
export interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
