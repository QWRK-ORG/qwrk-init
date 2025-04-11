import type * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Textarea component for multi-line text input
 * Supports all standard HTML textarea attributes
 *
 * @example Basic usage
 * ```tsx
 * <Textarea placeholder="Type your message here" />
 * ```
 *
 * @example With rows and maxLength
 * ```tsx
 * <Textarea
 *   placeholder="Enter a description"
 *   rows={5}
 *   maxLength={500}
 * />
 * ```
 *
 * @example With form validation
 * ```tsx
 * <Textarea
 *   aria-invalid={errors.message ? true : undefined}
 *   placeholder="Message"
 *   required
 * />
 * ```
 */
function Textarea({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
