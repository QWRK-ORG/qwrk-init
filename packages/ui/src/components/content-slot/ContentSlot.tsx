"use client"

import { cn } from "@workspace/ui/lib/utils.js"
import React, { type ReactNode } from "react"

export interface ContentSlotProps {
    children?: ReactNode
    placeholder?: string
    isEmpty?: boolean
    icon?: ReactNode
    className?: string
}

/**
 * ContentSlot - A placeholder component for swappable content
 *
 * @param children - The content to display
 * @param placeholder - Text to display when the slot is empty
 * @param isEmpty - Whether the slot should be displayed as empty
 * @param icon - Optional icon to display in the empty state
 * @param className - Additional CSS classes
 */
export function ContentSlot({
    children,
    placeholder = "Slot (swap it with your content)",
    isEmpty = false,
    icon,
    className
}: ContentSlotProps) {
    if (children && !isEmpty) {
        return <div className={className}>{children}</div>
    }

    return (
        <div
            className={cn(
                "border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground",
                className
            )}
        >
            {icon && <div className='mb-2'>{icon}</div>}
            <p>{placeholder}</p>
        </div>
    )
}
