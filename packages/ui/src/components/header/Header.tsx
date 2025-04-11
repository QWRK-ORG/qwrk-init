"use client"

import { cn } from "@workspace/ui/lib/utils.js"
import React, { type ReactNode } from "react"

export interface BreadcrumbItem {
    label: string
    href?: string
}

export interface HeaderProps {
    breadcrumbs?: BreadcrumbItem[]
    actions?: ReactNode
    searchBar?: ReactNode
    userMenu?: ReactNode
    title?: string
    description?: string
    className?: string
}

/**
 * Breadcrumbs - Navigation breadcrumbs component
 */
const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
    return (
        <nav className='flex'>
            {items.map((item, index) => (
                <React.Fragment key={item.label}>
                    {index > 0 && <span className='mx-2 text-muted-foreground'>/</span>}
                    {item.href ? (
                        <a href={item.href} className='text-foreground hover:text-primary'>
                            {item.label}
                        </a>
                    ) : (
                        <span className='text-foreground font-medium'>{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    )
}

/**
 * Header - Main header component for the application
 *
 * @param breadcrumbs - Array of breadcrumb items for navigation
 * @param actions - Optional action buttons
 * @param searchBar - Optional search component
 * @param userMenu - Optional user menu/profile component
 * @param title - Optional title to display in the header
 * @param description - Optional description to display under the title
 * @param className - Optional additional CSS classes
 */
export function Header({
    breadcrumbs,
    actions,
    searchBar,
    userMenu,
    title,
    description,
    className
}: HeaderProps) {
    return (
        <header className={cn("bg-background border-b border-border", className)}>
            <div className='px-4 py-3 flex items-center justify-between'>
                <div className='flex items-center'>
                    {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}

                    {title && (
                        <div className={cn(breadcrumbs ? "ml-4" : "")}>
                            <h1 className='text-lg font-medium'>{title}</h1>
                            {description && (
                                <p className='text-sm text-muted-foreground'>{description}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className='flex items-center space-x-4'>
                    {searchBar && <div className='relative w-64'>{searchBar}</div>}

                    {actions && <div className='flex items-center space-x-2'>{actions}</div>}

                    {userMenu && <div>{userMenu}</div>}
                </div>
            </div>
        </header>
    )
}
