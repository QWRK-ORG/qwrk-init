/**
 * Type definitions for the Tooltip component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Tooltip component
 *
 * @public
 * @interface
 */
export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
