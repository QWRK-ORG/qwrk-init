import type * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Card container for grouping related content
 * Provides visual structure with border and shadow
 *
 * @example Basic usage
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Main content goes here</CardContent>
 *   <CardFooter>Footer content</CardFooter>
 * </Card>
 * ```
 */
function Card({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card'
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Header section for a Card component
 * Contains title, description, and optional action elements
 *
 * @example
 * ```tsx
 * <CardHeader>
 *   <CardTitle>Account Settings</CardTitle>
 *   <CardDescription>Manage your account preferences</CardDescription>
 *   <CardAction>
 *     <Button size="sm">Edit</Button>
 *   </CardAction>
 * </CardHeader>
 * ```
 */
function CardHeader({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Title component for Card header
 * Typically used for the main heading of a card
 *
 * @example
 * ```tsx
 * <CardTitle>Account Settings</CardTitle>
 * ```
 */
function CardTitle({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card-title'
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Description component for Card header
 * Provides supporting text or details below the card title
 *
 * @example
 * ```tsx
 * <CardDescription>Manage your account settings and preferences</CardDescription>
 * ```
 */
function CardDescription({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card-description'
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Action component for Card header
 * Container for buttons or interactive elements in the header
 * Automatically positioned at the right side of the header
 *
 * @example
 * ```tsx
 * <CardAction>
 *   <Button size="sm" variant="outline">Edit</Button>
 * </CardAction>
 * ```
 */
function CardAction({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card-action'
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Content container for Card component
 * Contains the main content of the card
 *
 * @example
 * ```tsx
 * <CardContent>
 *   <p>This is the main content area of the card.</p>
 *   <form>...</form>
 * </CardContent>
 * ```
 */
function CardContent({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card-content'
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * Footer component for Card
 * Used for actions or additional information at the bottom of the card
 *
 * @example
 * ```tsx
 * <CardFooter>
 *   <Button>Save changes</Button>
 *   <Button variant="outline">Cancel</Button>
 * </CardFooter>
 * ```
 */
function CardFooter({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card-footer'
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent
}
