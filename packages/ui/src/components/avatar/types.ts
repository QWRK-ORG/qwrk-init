/**
 * Type definitions for the Avatar component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Avatar component
 *
 * @public
 * @interface
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
