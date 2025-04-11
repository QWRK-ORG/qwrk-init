import type * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Skeleton loading placeholder component
 * Shows animated loading state for content that's still loading
 *
 * @example Basic usage
 * ```tsx
 * <Skeleton className="h-4 w-[250px]" />
 * ```
 *
 * @example Avatar placeholder
 * ```tsx
 * <Skeleton className="h-12 w-12 rounded-full" />
 * ```
 *
 * @example Card content loading state
 * ```tsx
 * <div className="space-y-2">
 *   <Skeleton className="h-6 w-[200px]" />
 *   <Skeleton className="h-4 w-[350px]" />
 *   <Skeleton className="h-4 w-[300px]" />
 * </div>
 * ```
 */
function Skeleton({
  /**
   * Additional CSS class names for controlling dimensions and shape
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='skeleton'
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
