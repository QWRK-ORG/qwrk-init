/**
 * Type definitions for the Resizable component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Resizable component
 *
 * @public
 * @interface
 */
export interface ResizableProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
