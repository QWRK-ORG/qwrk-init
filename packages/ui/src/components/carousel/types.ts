/**
 * Type definitions for the Carousel component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Carousel component
 *
 * @public
 * @interface
 */
export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
