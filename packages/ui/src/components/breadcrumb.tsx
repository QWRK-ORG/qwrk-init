import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import type * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Breadcrumb component for displaying navigation hierarchy
 * Used to show the current location within a navigational hierarchy
 *
 * @example Basic usage
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Current Page</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label='breadcrumb' data-slot='breadcrumb' {...props} />
}

/**
 * BreadcrumbList component to contain breadcrumb items
 * Provides proper ordered list structure for breadcrumb navigation
 *
 * @example
 * ```tsx
 * <BreadcrumbList>
 *   {Breadcrumb items }
 * </BreadcrumbList>
 * ```
 */
function BreadcrumbList({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot='breadcrumb-list'
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

/**
 * BreadcrumbItem component for individual navigation segments
 * Contains links or the current page indicator
 *
 * @example
 * ```tsx
 * <BreadcrumbItem>
 *   <BreadcrumbLink href="/products">Products</BreadcrumbLink>
 * </BreadcrumbItem>
 * ```
 */
function BreadcrumbItem({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot='breadcrumb-item'
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

/**
 * BreadcrumbLink component for interactive navigation links
 * Used for all breadcrumb links except the current page
 *
 * @example
 * ```tsx
 * <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
 * ```
 *
 * @example With Next.js Link
 * ```tsx
 * <BreadcrumbLink asChild>
 *   <Link href="/settings">Settings</Link>
 * </BreadcrumbLink>
 * ```
 */
function BreadcrumbLink({
  /**
   * When true, component will render as its child
   * Use with framework components like Next.js Link
   */
  asChild,
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot='breadcrumb-link'
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  )
}

/**
 * BreadcrumbPage component for displaying the current page
 * Styled differently and marked as current page for accessibility
 *
 * @example
 * ```tsx
 * <BreadcrumbPage>Current Page Title</BreadcrumbPage>
 * ```
 */
function BreadcrumbPage({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot='breadcrumb-page'
      role='link'
      tabIndex={0}
      aria-disabled='true'
      aria-current='page'
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  )
}

/**
 * BreadcrumbSeparator component for visual separation between items
 * Renders a chevron by default but can be customized with children
 *
 * @example Default separator
 * ```tsx
 * <BreadcrumbSeparator />
 * ```
 *
 * @example Custom separator
 * ```tsx
 * <BreadcrumbSeparator>
 *   <SlashIcon />
 * </BreadcrumbSeparator>
 * ```
 */
function BreadcrumbSeparator({
  /**
   * Custom separator element (defaults to ChevronRight icon)
   */
  children,
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot='breadcrumb-separator'
      role='presentation'
      aria-hidden='true'
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

/**
 * BreadcrumbEllipsis component for indicating truncated breadcrumbs
 * Used when there are too many breadcrumb items to display
 *
 * @example
 * ```tsx
 * <BreadcrumbItem>
 *   <BreadcrumbLink href="/">Home</BreadcrumbLink>
 * </BreadcrumbItem>
 * <BreadcrumbSeparator />
 * <BreadcrumbEllipsis />
 * <BreadcrumbSeparator />
 * <BreadcrumbItem>
 *   <BreadcrumbPage>Current Page</BreadcrumbPage>
 * </BreadcrumbItem>
 * ```
 */
function BreadcrumbEllipsis({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot='breadcrumb-ellipsis'
      role='presentation'
      aria-hidden='true'
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className='size-4' />
      <span className='sr-only'>More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
}
