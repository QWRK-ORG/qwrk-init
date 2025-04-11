"use client"

import * as LabelPrimitive from "@radix-ui/react-label"
import type * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Label component for form controls
 * Built on Radix UI Label primitive for accessibility
 *
 * @example Basic usage with input
 * ```tsx
 * <div className="space-y-2">
 *   <Label htmlFor="email">Email</Label>
 *   <Input id="email" type="email" />
 * </div>
 * ```
 *
 * @example With required indicator
 * ```tsx
 * <Label htmlFor="password">
 *   Password <span className="text-destructive">*</span>
 * </Label>
 * ```
 *
 * @example With checkbox
 * ```tsx
 * <div className="flex items-center space-x-2">
 *   <Checkbox id="terms" />
 *   <Label htmlFor="terms">Accept terms and conditions</Label>
 * </div>
 * ```
 */
function Label({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot='label'
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
