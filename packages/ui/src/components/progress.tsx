"use client"

import * as ProgressPrimitive from "@radix-ui/react-progress"
import type * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Progress indicator component for displaying loading state or completion percentage
 * Built on Radix UI Progress primitive
 *
 * @example Basic usage
 * ```tsx
 * <Progress value={33} />
 * ```
 *
 * @example With aria label and custom styling
 * ```tsx
 * <Progress
 *   value={80}
 *   aria-label="Loading..."
 *   className="h-3 w-[300px]"
 * />
 * ```
 *
 * @example With dynamic progress value
 * ```tsx
 * <Progress value={progress} max={100} />
 * ```
 */
function Progress({
  /**
   * Additional CSS class names
   */
  className,
  /**
   * Current progress value (0-100)
   */
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot='progress'
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot='progress-indicator'
        className='bg-primary h-full w-full flex-1 transition-all'
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
