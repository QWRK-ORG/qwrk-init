/**
 * Type definitions for the Separator component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Separator component
 *
 * @public
 * @interface
 */
export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
