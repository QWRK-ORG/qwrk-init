"use client"

import { cn } from "@workspace/ui/lib/utils"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

/**
 * Breadcrumb item properties
 * @interface BreadcrumbItemProps
 */
export interface BreadcrumbItemProps {
    /** Link href */
    href?: string
    /** Whether this is the current page (last item) */
    isCurrent?: boolean
    /** Breadcrumb content */
    children: ReactNode
    /** Optional CSS classes */
    className?: string
}

/**
 * Breadcrumb item component
 * @param props - Component properties
 * @returns Breadcrumb item component
 */
export function BreadcrumbItem({
    href,
    isCurrent = false,
    children,
    className
}: BreadcrumbItemProps) {
    const content = (
        <span
            className={cn(
                "text-sm",
                isCurrent ? "font-medium text-foreground" : "text-muted-foreground",
                className
            )}
            aria-current={isCurrent ? "page" : undefined}
        >
            {children}
        </span>
    )

    if (href && !isCurrent) {
        return (
            <Link href={href} className='hover:text-foreground'>
                {content}
            </Link>
        )
    }

    return content
}

/**
 * Breadcrumbs properties
 * @interface BreadcrumbsProps
 */
export interface BreadcrumbsProps {
    /** Breadcrumb items */
    items: Array<{
        href?: string
        label: string
    }>
    /** Optional CSS classes */
    className?: string
    /** Optional separator element (defaults to ChevronRight) */
    separator?: ReactNode
}

/**
 * Breadcrumbs component
 * @param props - Component properties
 * @returns Breadcrumbs component
 */
export function Breadcrumbs({
    items,
    className,
    separator = <ChevronRight className='h-4 w-4' />
}: BreadcrumbsProps) {
    return (
        <nav aria-label='Breadcrumb' className={className}>
            <ol className='flex items-center space-x-2'>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1

                    return (
                        <li key={item.href} className='flex items-center'>
                            <BreadcrumbItem
                                href={!isLast ? item.href : undefined}
                                isCurrent={isLast}
                            >
                                {item.label}
                            </BreadcrumbItem>

                            {!isLast && (
                                <span className='mx-2 text-muted-foreground'>{separator}</span>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
