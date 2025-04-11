/**
 * Type definitions for the Alert component
 *
 * @packageDocumentation
 */

import { type VariantProps, cva } from "class-variance-authority"
import type * as React from "react"

/**
 * Alert component variants
 *
 * @public
 */
export const alertVariants = cva(
    "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
    {
        variants: {
            variant: {
                default: "bg-card text-card-foreground",
                destructive:
                    "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
)

/**
 * Props for the Alert component
 *
 * @public
 * @interface
 */
export interface AlertProps
    extends React.ComponentProps<"div">,
        VariantProps<typeof alertVariants> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * Alert variant
     */
    variant?: "default" | "destructive"
}

/**
 * Props for the AlertTitle component
 *
 * @public
 * @interface
 */
export interface AlertTitleProps extends React.ComponentProps<"div"> {
    /**
     * Additional CSS class names
     */
    className?: string
}

/**
 * Props for the AlertDescription component
 *
 * @public
 * @interface
 */
export interface AlertDescriptionProps extends React.ComponentProps<"div"> {
    /**
     * Additional CSS class names
     */
    className?: string
}
