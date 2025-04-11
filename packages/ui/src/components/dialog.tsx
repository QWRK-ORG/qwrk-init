"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import type * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Dialog component for creating accessible modal dialogs
 * Built on Radix UI Dialog primitive for accessibility
 *
 * @example Basic usage
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>Open Dialog</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Dialog Title</DialogTitle>
 *       <DialogDescription>This is a description of the dialog.</DialogDescription>
 *     </DialogHeader>
 *     <div>Dialog content goes here</div>
 *     <DialogFooter>
 *       <Button>Save changes</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot='dialog' {...props} />
}

/**
 * DialogTrigger component
 * Element that opens the dialog when clicked/activated
 *
 * @example
 * ```tsx
 * <DialogTrigger>
 *   <Button>Open Dialog</Button>
 * </DialogTrigger>
 * ```
 */
function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />
}

/**
 * DialogPortal component
 * Portals dialog content outside the DOM hierarchy for proper stacking
 */
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />
}

/**
 * DialogClose component
 * Button that closes the dialog when clicked/activated
 *
 * @example
 * ```tsx
 * <DialogClose>
 *   <Button variant="outline">Cancel</Button>
 * </DialogClose>
 * ```
 */
function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot='dialog-close' {...props} />
}

/**
 * DialogOverlay component
 * Backdrop that covers the viewport when dialog is open
 */
function DialogOverlay({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot='dialog-overlay'
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * DialogContent component
 * Container for dialog content with built-in animations and close button
 *
 * @example
 * ```tsx
 * <DialogContent>
 *   <DialogHeader>
 *     <DialogTitle>Edit Profile</DialogTitle>
 *     <DialogDescription>Make changes to your profile here.</DialogDescription>
 *   </DialogHeader>
 *   <div className="grid gap-4 py-4">
 *     <div className="grid grid-cols-4 items-center gap-4">
 *       <Label htmlFor="name" className="text-right">Name</Label>
 *       <Input id="name" defaultValue="John Doe" className="col-span-3" />
 *     </div>
 *   </div>
 *   <DialogFooter>
 *     <Button type="submit">Save changes</Button>
 *   </DialogFooter>
 * </DialogContent>
 * ```
 */
function DialogContent({
  /**
   * Additional CSS class names
   */
  className,
  /**
   * Dialog content
   */
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot='dialog-portal'>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot='dialog-content'
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className='sr-only'>Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

/**
 * DialogHeader component
 * Container for dialog title and description with appropriate styling
 *
 * @example
 * ```tsx
 * <DialogHeader>
 *   <DialogTitle>Dialog Title</DialogTitle>
 *   <DialogDescription>Dialog description goes here.</DialogDescription>
 * </DialogHeader>
 * ```
 */
function DialogHeader({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='dialog-header'
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

/**
 * DialogFooter component
 * Container for dialog actions with appropriate styling
 *
 * @example
 * ```tsx
 * <DialogFooter>
 *   <Button type="button" variant="outline">Cancel</Button>
 *   <Button type="submit">Continue</Button>
 * </DialogFooter>
 * ```
 */
function DialogFooter({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='dialog-footer'
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * DialogTitle component
 * Title for the dialog with appropriate styling
 *
 * @example
 * ```tsx
 * <DialogTitle>Create a new account</DialogTitle>
 * ```
 */
function DialogTitle({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot='dialog-title'
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * DialogDescription component
 * Description text for the dialog with appropriate styling
 *
 * @example
 * ```tsx
 * <DialogDescription>
 *   This action cannot be undone. This will permanently delete your account
 *   and remove your data from our servers.
 * </DialogDescription>
 * ```
 */
function DialogDescription({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot='dialog-description'
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
}
