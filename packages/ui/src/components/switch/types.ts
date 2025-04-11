/**
 * Type definitions for the Switch component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Switch component
 *
 * @public
 * @interface
 */
export interface SwitchProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
