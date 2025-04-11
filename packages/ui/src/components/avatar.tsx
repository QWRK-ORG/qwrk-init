"use client"

import * as AvatarPrimitive from "@radix-ui/react-avatar"
import type * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Avatar component for user profile pictures
 * Built on Radix UI Avatar primitive
 *
 * @example Basic usage
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
function Avatar({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot='avatar'
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

/**
 * Image component for Avatar
 * Displays the user's profile picture
 *
 * @example
 * ```tsx
 * <AvatarImage src="/user.jpg" alt="User name" />
 * ```
 */
function AvatarImage({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot='avatar-image'
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

/**
 * Fallback component for Avatar
 * Displayed when the image fails to load or is not provided
 * Typically contains user's initials or a generic icon
 *
 * @example
 * ```tsx
 * <AvatarFallback>JD</AvatarFallback>
 * ```
 */
function AvatarFallback({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot='avatar-fallback'
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
