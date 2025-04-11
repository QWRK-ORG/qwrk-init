"use client"

import type { ReactNode } from "react"

/**
 * Page header properties
 * @interface PageHeaderProps
 */
export interface PageHeaderProps {
    /** Page title */
    title: string
    /** Optional page description */
    description?: string
    /** Optional actions to display on the right */
    actions?: ReactNode
    /** Optional CSS classes */
    className?: string
}

/**
 * Page header component
 * @param props - Component properties
 * @returns Page header component
 */
export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
    return (
        <div className={className}>
            <div className='flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0'>
                <div className='space-y-4'>
                    <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
                    {description && <p className='text-sm text-muted-foreground'>{description}</p>}
                </div>
                {actions && <div className='flex items-center gap-2'>{actions}</div>}
            </div>
        </div>
    )
}
