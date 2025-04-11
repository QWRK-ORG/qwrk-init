/**
 * Type definitions for the Skeleton component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Skeleton component
 *
 * @public
 * @interface
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
