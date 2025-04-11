/**
 * Type definitions for the Calendar component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Calendar component
 *
 * @public
 * @interface
 */
export interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
