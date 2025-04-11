/**
 * Type definitions for the HoverCard component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the HoverCard component
 *
 * @public
 * @interface
 */
export interface HoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
