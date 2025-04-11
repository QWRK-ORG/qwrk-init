"use client"

import { cn } from "@workspace/ui/lib/utils.js"
import React, { type ReactNode } from "react"

export interface PageWrapperProps {
    title?: string
    description?: string
    children: ReactNode
    actions?: ReactNode
    breadcrumbs?: ReactNode
    sidebar?: ReactNode
    header?: ReactNode
    className?: string
}

/**
 * PageWrapper - A generic page container that handles layout structure
 *
 * @param title - The page title
 * @param description - Optional page description
 * @param children - The main content of the page
 * @param actions - Optional action buttons (e.g., Share, View, Edit, Publish)
 * @param breadcrumbs - Optional breadcrumb navigation
 * @param sidebar - Optional sidebar content
 * @param header - Optional custom header content
 * @param className - Optional additional CSS classes
 */
export function PageWrapper({
    title,
    description,
    children,
    actions,
    breadcrumbs,
    sidebar,
    header,
    className
}: PageWrapperProps) {
    return (
        <div className={cn("flex min-h-screen", className)}>
            {/* Sidebar */}
            {sidebar && <aside className='border-r border-border min-h-screen'>{sidebar}</aside>}

            {/* Main content */}
            <div className='flex-1'>
                {/* Header */}
                {header && <header className='border-b border-border p-4'>{header}</header>}

                {/* Page content */}
                <div className='p-6'>
                    {title && (
                        <div className='mb-6 flex items-center justify-between'>
                            <div>
                                <h1 className='text-2xl font-bold'>{title}</h1>
                                {description && (
                                    <p className='text-muted-foreground'>{description}</p>
                                )}
                            </div>
                            {actions && (
                                <div className='flex items-center space-x-2'>{actions}</div>
                            )}
                        </div>
                    )}

                    {/* Main content area */}
                    <div className='mt-6'>{children}</div>
                </div>
            </div>
        </div>
    )
}
