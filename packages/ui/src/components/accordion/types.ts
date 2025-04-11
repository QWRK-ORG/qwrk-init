/**
 * Type definitions for the Accordion component
 *
 * @packageDocumentation
 */

import type * as AccordionPrimitive from "@radix-ui/react-accordion"
import type * as React from "react"

/**
 * Props for the Accordion component
 *
 * @public
 * @interface
 */
export type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Root>

/**
 * Props for the AccordionItem component
 *
 * @public
 * @interface
 */
export type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item> & {
    /**
     * Additional CSS class names
     */
    className?: string
}

/**
 * Props for the AccordionTrigger component
 *
 * @public
 * @interface
 */
export type AccordionTriggerProps = React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * Content of the trigger
     */
    children: React.ReactNode
}

/**
 * Props for the AccordionContent component
 *
 * @public
 * @interface
 */
export type AccordionContentProps = React.ComponentProps<typeof AccordionPrimitive.Content> & {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * Content to display when the accordion item is expanded
     */
    children: React.ReactNode
}
