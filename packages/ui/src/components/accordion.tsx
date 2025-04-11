"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"
import type * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Accordion - A vertically collapsing panel to show/hide content sections
 * @component
 * @param props - All properties extended from `@radix-ui/react-accordion`
 * @example
 * <Accordion>
 *  <AccordionItem value="item-1">
 *   <AccordionTrigger>Is it accessible?</AccordionTrigger>
 *   <AccordionContent>Yes. It adheres to the WAI-ARIA specifications.</AccordionContent>
 *  </AccordionItem>
 * </Accordion>
 * @see https://radix-ui.com/docs/primitives/components/accordion
 */
function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot='accordion' {...props} />
}

/**
 * AccordionItem - An individual item within an Accordion panel
 * @component
 * @param props - All properties extended from `@radix-ui/react-accordion`.  Must be a direct child of `<Accordion>`
 * @example
 * <AccordionItem value="item-1">
 *   <AccordionTrigger>Section Title</AccordionTrigger>
 *   <AccordionContent>Section Content</AccordionContent>
 * </AccordionItem>
 */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot='accordion-item'
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}

/**
 * AccordionTrigger - The clickable title/header for an `AccordionItem` that toggles the content visibility
 * @component
 * @param props - All properties extended from `@radix-ui/react-accordion`
 * @example
 * <AccordionItem value="item-1">
 *   <AccordionTrigger>Click to Toggle</AccordionTrigger>
 *   <AccordionContent>Content to reveal</AccordionContent>
 * </AccordionItem>
 */
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
        data-slot='accordion-trigger'
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className='text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200' />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/**
 * AccordionContent - The expandable content section within an `AccordionItem`
 * @component
 * @param props - All properties extended from `@radix-ui/react-accordion`
 * @example
 * <AccordionItem value="item-1">
 *   <AccordionTrigger>Click to Toggle</AccordionTrigger>
 *   <AccordionContent>This content is revealed when the trigger is clicked.</AccordionContent>
 * </AccordionItem>
 */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot='accordion-content'
      className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm'
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
