/**
 * Type definitions for the ContextMenu component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the ContextMenu component
 *
 * @public
 * @interface
 */
export interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
