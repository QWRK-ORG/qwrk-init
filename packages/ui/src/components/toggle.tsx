"use client"

import * as TogglePrimitive from "@radix-ui/react-toggle"
import { type VariantProps, cva } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Toggle variants for styling with class-variance-authority
 * Used for defining visual styles and sizes of the Toggle component
 */
const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

/**
 * Toggle component for togglable buttons with pressed/unpressed states
 * Built on Radix UI Toggle primitive for accessibility
 *
 * @example Basic usage
 * ```tsx
 * <Toggle>
 *   <BoldIcon />
 *   <span>Bold</span>
 * </Toggle>
 * ```
 *
 * @example With variants
 * ```tsx
 * <Toggle variant="outline" size="sm">
 *   <ItalicIcon />
 *   <span>Italic</span>
 * </Toggle>
 * ```
 *
 * @example In a toolbar
 * ```tsx
 * <div className="flex space-x-1">
 *   <Toggle aria-label="Toggle bold">
 *     <BoldIcon />
 *   </Toggle>
 *   <Toggle aria-label="Toggle italic">
 *     <ItalicIcon />
 *   </Toggle>
 *   <Toggle aria-label="Toggle underline">
 *     <UnderlineIcon />
 *   </Toggle>
 * </div>
 * ```
 */
function Toggle({
  /**
   * Additional CSS class names
   */
  className,
  /**
   * Visual style variant
   * @default "default"
   */
  variant,
  /**
   * Size variant
   * @default "default"
   */
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot='toggle'
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
