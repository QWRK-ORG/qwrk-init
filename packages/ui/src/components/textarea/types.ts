/**
 * Type definitions for the Textarea component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Textarea component
 *
 * @public
 * @interface
 */
export interface TextareaProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
