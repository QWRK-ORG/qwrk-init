import type * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Standard input component with consistent styling
 * Supports all standard HTML input attributes
 *
 * @example Basic usage
 * ```tsx
 * <Input placeholder="Email address" />
 * ```
 *
 * @example With type and required
 * ```tsx
 * <Input
 *   type="email"
 *   placeholder="Enter your email"
 *   required
 * />
 * ```
 *
 * @example With error state
 * ```tsx
 * <Input
 *   type="password"
 *   aria-invalid={errors.password ? true : undefined}
 * />
 * ```
 */
function Input({
  /**
   * Additional CSS class names
   */
  className,
  /**
   * HTML input type attribute
   * @default "text"
   */
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
