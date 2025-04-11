"use client"

import * as SeparatorPrimitive from "@radix-ui/react-separator"
import type * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Separator component for creating visual divisions between content
 * Built on Radix UI Separator primitive for accessibility
 *
 * @example Horizontal separator (default)
 * ```tsx
 * <div>
 *   <h2>Section 1</h2>
 *   <p>Content for section 1</p>
 *   <Separator className="my-4" />
 *   <h2>Section 2</h2>
 *   <p>Content for section 2</p>
 * </div>
 * ```
 *
 * @example Vertical separator
 * ```tsx
 * <div className="flex h-5 items-center space-x-4">
 *   <div>Item 1</div>
 *   <Separator orientation="vertical" />
 *   <div>Item 2</div>
 * </div>
 * ```
 */
function Separator({
  /**
   * Additional CSS class names
   */
  className,
  /**
   * Direction of the separator line
   * @default "horizontal"
   */
  orientation = "horizontal",
  /**
   * Whether the separator is purely visual or represents a semantic boundary
   * @default true
   */
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot='separator-root'
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
