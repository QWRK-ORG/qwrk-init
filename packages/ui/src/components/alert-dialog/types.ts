/**
 * Type definitions for the AlertDialog component
 *
 * @packageDocumentation
 */

import type * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import type * as React from "react"

/**
 * Props for the AlertDialog component
 *
 * @public
 * @interface
 */
export type AlertDialogProps = React.ComponentProps<typeof AlertDialogPrimitive.Root>

/**
 * Props for the AlertDialogTrigger component
 *
 * @public
 * @interface
 */
export type AlertDialogTriggerProps = React.ComponentProps<typeof AlertDialogPrimitive.Trigger>

/**
 * Props for the AlertDialogOverlay component
 *
 * @public
 * @interface
 */
export type AlertDialogOverlayProps = React.ComponentPropsWithoutRef<
    typeof AlertDialogPrimitive.Overlay
> & {
    /**
     * Additional CSS class names
     */
    className?: string
}

/**
 * Props for the AlertDialogContent component
 *
 * @public
 * @interface
 */
export type AlertDialogContentProps = React.ComponentPropsWithoutRef<
    typeof AlertDialogPrimitive.Content
> & {
    /**
     * Additional CSS class names
     */
    className?: string
}

/**
 * Props for the AlertDialogHeader component
 *
 * @public
 * @interface
 */
export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Additional CSS class names
     */
    className?: string
}

/**
 * Props for the AlertDialogFooter component
 *
 * @public
 * @interface
 */
export type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Additional CSS class names
     */
    className?: string
}

/**
 * Props for the AlertDialogTitle component
 *
 * @public
 * @interface
 */
export type AlertDialogTitleProps = React.ComponentPropsWithoutRef<
    typeof AlertDialogPrimitive.Title
> & {
    /**
     * Additional CSS class names
     */
    className?: string
}

/**
 * Props for the AlertDialogDescription component
 *
 * @public
 * @interface
 */
export type AlertDialogDescriptionProps = React.ComponentPropsWithoutRef<
    typeof AlertDialogPrimitive.Description
> & {
    /**
     * Additional CSS class names
     */
    className?: string
}

/**
 * Props for the AlertDialogAction component
 *
 * @public
 * @interface
 */
export type AlertDialogActionProps = React.ComponentPropsWithoutRef<
    typeof AlertDialogPrimitive.Action
> & {
    /**
     * Additional CSS class names
     */
    className?: string
}

/**
 * Props for the AlertDialogCancel component
 *
 * @public
 * @interface
 */
export type AlertDialogCancelProps = React.ComponentPropsWithoutRef<
    typeof AlertDialogPrimitive.Cancel
> & {
    /**
     * Additional CSS class names
     */
    className?: string
}
