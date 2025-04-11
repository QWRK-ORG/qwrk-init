/**
 * Type definitions for the Breadcrumb component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Breadcrumb component
 *
 * @public
 * @interface
 */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
