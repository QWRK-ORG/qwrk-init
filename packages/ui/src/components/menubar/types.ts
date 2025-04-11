/**
 * Type definitions for the Menubar component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Menubar component
 *
 * @public
 * @interface
 */
export interface MenubarProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
