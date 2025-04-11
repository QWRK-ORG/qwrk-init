/**
 * Type definitions for the AspectRatio component
 *
 * @packageDocumentation
 */

import type * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import type * as React from "react"

/**
 * Props for the AspectRatio component
 *
 * @public
 * @interface
 */
export interface AspectRatioProps extends React.ComponentProps<typeof AspectRatioPrimitive.Root> {
    /**
     * The ratio of the width to the height
     */
    ratio?: number
    /**
     * Additional CSS class names
     */
    className?: string
}
