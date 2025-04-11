/**
 * Type definitions for the Tabs component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Tabs component
 *
 * @public
 * @interface
 */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
