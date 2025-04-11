"use client"

import { cn } from "@workspace/ui/lib/utils"
import type { ReactNode } from "react"

/**
 * Navigation wrapper properties
 * @interface NavigationWrapperProps
 */
export interface NavigationWrapperProps {
    /** Children content to render */
    children: ReactNode
    /** Optional CSS classes for the wrapper */
    className?: string
}

/**
 * Navigation wrapper component that provides consistent styling for navigation elements
 * @param props - Component properties
 * @returns Navigation wrapper component
 */
export function NavigationWrapper({ children, className }: NavigationWrapperProps) {
    return <div className={cn("flex min-h-screen flex-col", className)}>{children}</div>
}
