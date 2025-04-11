/**
 * Type definitions for the Dialog component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Dialog component
 *
 * @public
 * @interface
 */
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
