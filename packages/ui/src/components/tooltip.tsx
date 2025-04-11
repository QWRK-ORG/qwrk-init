"use client"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import type * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * TooltipProvider component for managing tooltip state and behavior
 * Typically used at the application root level or wraps a specific section
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   // Your app content
 * </TooltipProvider>
 * ```
 */
function TooltipProvider({
  /**
   * Time in milliseconds before tooltip appears
   * @default 0
   */
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot='tooltip-provider'
      delayDuration={delayDuration}
      {...props}
    />
  )
}

/**
 * Tooltip component for displaying additional information on hover
 * Contains a trigger element and content that appears on hover
 *
 * @example Basic usage
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>Tooltip content</TooltipContent>
 * </Tooltip>
 * ```
 */
function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot='tooltip' {...props} />
    </TooltipProvider>
  )
}

/**
 * TooltipTrigger component for the element that activates the tooltip
 * Wrap any element that should show a tooltip on hover
 *
 * @example
 * ```tsx
 * <TooltipTrigger>
 *   <Button>Hover me</Button>
 * </TooltipTrigger>
 * ```
 */
function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />
}

/**
 * TooltipContent component for the popup that appears when hovering
 * Contains the content to display in the tooltip
 *
 * @example Basic usage
 * ```tsx
 * <TooltipContent>Tooltip text</TooltipContent>
 * ```
 *
 * @example With positioning
 * ```tsx
 * <TooltipContent side="right" sideOffset={5}>
 *   This appears 5px from the right side
 * </TooltipContent>
 * ```
 */
function TooltipContent({
  /**
   * Additional CSS class names
   */
  className,
  /**
   * Space between trigger and content
   * @default 0
   */
  sideOffset = 0,
  /**
   * Tooltip content
   */
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot='tooltip-content'
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className='bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]' />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
