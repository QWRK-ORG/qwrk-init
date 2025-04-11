/**
 * Type definitions for the Collapsible component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Collapsible component
 *
 * @public
 * @interface
 */
export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
