"use client"

import { useNavigationStore } from "@/stores/navigation-store"
import { cn } from "@workspace/ui/lib/utils"
import { useEffect } from "react"
import type { ReactNode } from "react"

/**
 * Page wrapper properties
 * @interface PageWrapperProps
 */
export interface PageWrapperProps {
    /** Page content */
    children: ReactNode
    /** Optional header content (e.g., breadcrumbs) */
    header?: ReactNode
    /** Optional CSS classes */
    className?: string
    /** Optional CSS classes for the content area */
    contentClassName?: string
    /** Optional breadcrumbs items - will be stored in navigation store if provided */
    breadcrumbs?: Array<{ href?: string; label: string }>
}

/**
 * Page wrapper component
 * @param props - Component properties
 * @returns Page wrapper component
 */
export function PageWrapper({
    children,
    header,
    className,
    contentClassName,
    breadcrumbs
}: PageWrapperProps) {
    const setBreadcrumbs = useNavigationStore((state) => state.setBreadcrumbs)

    // Update breadcrumbs in the store when they change
    useEffect(() => {
        if (breadcrumbs) {
            setBreadcrumbs(breadcrumbs)
        }
    }, [breadcrumbs, setBreadcrumbs])

    return (
        <div className={cn("flex min-h-screen flex-col", className)}>
            {header && (
                <div className='border-b bg-background hidden md:block'>
                    <div className='container px-4 py-4 md:px-6'>{header}</div>
                </div>
            )}
            <main className={cn("flex-1", contentClassName)}>
                <div className='container max-w-screen-xl mx-auto px-4 py-6 md:px-6'>
                    {children}
                </div>
            </main>
        </div>
    )
}
