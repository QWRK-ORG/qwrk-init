import { type VariantProps, cva } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Alert variants for styling with class-variance-authority
 * Provides consistent alert styling across the application
 */
const alertVariants = cva(
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
 * Alert component for displaying important messages to users
 * Available in multiple variants for different visual emphasis
 *
 * @example Basic usage
 * ```tsx
 * <Alert>
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>
 *     You can add components to your app using the cli.
 *   </AlertDescription>
 * </Alert>
 * ```
 *
 * @example With destructive variant and icon
 * ```tsx
 * <Alert variant="destructive">
 *   <AlertCircleIcon />
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>
 *     Your session has expired. Please log in again.
 *   </AlertDescription>
 * </Alert>
 * ```
 */
function Alert({
  /**
   * Additional CSS class names
   */
  className,
  /**
   * Visual style variant of the alert
   * @default "default"
   */
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot='alert'
      role='alert'
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

/**
 * Title component for Alert
 * Provides styling for the main heading in an alert
 *
 * @example
 * ```tsx
 * <AlertTitle>Success</AlertTitle>
 * ```
 */
function AlertTitle({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='alert-title'
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

/**
 * Description component for Alert
 * Provides styling for the supporting text in an alert
 *
 * @example
 * ```tsx
 * <AlertDescription>
 *   Your password has been successfully changed.
 * </AlertDescription>
 * ```
 */
function AlertDescription({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='alert-description'
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
