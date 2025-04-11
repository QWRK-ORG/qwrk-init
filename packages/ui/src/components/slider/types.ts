/**
 * Type definitions for the Slider component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Slider component
 *
 * @public
 * @interface
 */
export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
