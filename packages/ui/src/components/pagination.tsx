import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon
} from "lucide-react"
import type * as React from "react"

import { type Button, buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

/**
 * Main pagination container component that wraps pagination content
 * Handles navigation between pages of content
 *
 * @example Basic usage
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href="#" />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#">1</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#" isActive>2</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#">3</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext href="#" />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
function Pagination({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label='pagination'
      data-slot='pagination'
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

/**
 * Container for pagination items
 * Arranges pagination items in a horizontal layout
 */
function PaginationContent({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot='pagination-content'
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

/**
 * Individual item container in the pagination list
 * Wraps links, buttons, or ellipsis elements
 */
function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot='pagination-item' {...props} />
}

/**
 * Props for the PaginationLink component
 */
type PaginationLinkProps = {
  /**
   * Whether this link represents the current page
   * When true, applies a different visual style and sets aria-current="page"
   */
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

/**
 * Link component for pagination items
 * Renders as a button-styled anchor element
 *
 * @example
 * ```tsx
 * <PaginationLink href="/page/1">1</PaginationLink>
 * <PaginationLink href="/page/2" isActive>2</PaginationLink>
 * ```
 */
function PaginationLink({
  /**
   * Additional CSS class names
   */
  className,
  /**
   * Whether this link represents the current page
   */
  isActive,
  /**
   * Size of the link button
   * @default "icon"
   */
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot='pagination-link'
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size
        }),
        className
      )}
      {...props}
    />
  )
}

/**
 * Previous page navigation link
 * Includes a left chevron icon and "Previous" text (on larger screens)
 *
 * @example
 * ```tsx
 * <PaginationPrevious href="/page/1" />
 * ```
 */
function PaginationPrevious({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label='Go to previous page'
      size='default'
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className='hidden sm:block'>Previous</span>
    </PaginationLink>
  )
}

/**
 * Next page navigation link
 * Includes a right chevron icon and "Next" text (on larger screens)
 *
 * @example
 * ```tsx
 * <PaginationNext href="/page/3" />
 * ```
 */
function PaginationNext({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label='Go to next page'
      size='default'
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className='hidden sm:block'>Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

/**
 * Ellipsis indicator for skipped page numbers
 * Visually indicates that there are more pages between adjacent page links
 *
 * @example
 * ```tsx
 * <PaginationItem>
 *   <PaginationLink href="/page/1">1</PaginationLink>
 * </PaginationItem>
 * <PaginationItem>
 *   <PaginationEllipsis />
 * </PaginationItem>
 * <PaginationItem>
 *   <PaginationLink href="/page/10">10</PaginationLink>
 * </PaginationItem>
 * ```
 */
function PaginationEllipsis({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot='pagination-ellipsis'
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className='size-4' />
      <span className='sr-only'>More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
}
