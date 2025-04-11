"use client"

import { useActivePath } from "@/hooks/use-active-path"
import { cn } from "@workspace/ui/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"
import { type ReactNode, useEffect, useState } from "react"

/**
 * Sidebar navigation item properties
 * @interface SidebarNavItemProps
 */
export interface SidebarNavItemProps {
    /** Link href */
    href: string
    /** Link label */
    label: string
    /** Optional icon */
    icon?: ReactNode
    /** Optional badge content */
    badge?: ReactNode
    /** Optional children items for nested navigation */
    children?: SidebarNavItemProps[]
    /** Optional CSS classes */
    className?: string
}

/**
 * Sidebar navigation item component
 * @param props - Component properties
 * @returns Sidebar navigation item component
 */
export function SidebarNavItem({
    href,
    label,
    icon,
    badge,
    children,
    className
}: SidebarNavItemProps) {
    const isActive = useActivePath()
    const [isOpen, setIsOpen] = useState(false)

    // Auto-expand if a child is active
    useEffect(() => {
        if (children?.some((child) => isActive(child.href, { exact: false }))) {
            setIsOpen(true)
        }
    }, [children, isActive])

    const hasChildren = children && children.length > 0
    const isCurrentActive = isActive(href, { exact: !hasChildren })

    return (
        <div className={cn("py-1", className)}>
            <div className='flex items-center'>
                <Link
                    href={href}
                    className={cn(
                        "flex flex-1 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isCurrentActive
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                >
                    {icon && <span className='h-4 w-4'>{icon}</span>}
                    <span className='flex-1'>{label}</span>
                    {badge && <span>{badge}</span>}
                </Link>

                {hasChildren && (
                    <button
                        type='button'
                        onClick={() => setIsOpen(!isOpen)}
                        className='p-2 text-muted-foreground hover:text-foreground'
                        aria-expanded={isOpen}
                        aria-label={isOpen ? "Collapse" : "Expand"}
                    >
                        {isOpen ? (
                            <ChevronDown className='h-4 w-4' />
                        ) : (
                            <ChevronRight className='h-4 w-4' />
                        )}
                    </button>
                )}
            </div>

            {hasChildren && isOpen && (
                <div className='ml-4 mt-1 space-y-1 border-l pl-3'>
                    {children.map((child) => (
                        <SidebarNavItem key={child.href} {...child} />
                    ))}
                </div>
            )}
        </div>
    )
}

/**
 * Sidebar navigation properties
 * @interface SidebarNavProps
 */
export interface SidebarNavProps {
    /** Navigation items */
    items: SidebarNavItemProps[]
    /** Optional CSS classes */
    className?: string
}

/**
 * Sidebar navigation component
 * @param props - Component properties
 * @returns Sidebar navigation component
 */
export function SidebarNav({ items, className }: SidebarNavProps) {
    return (
        <nav className={cn("space-y-1", className)}>
            {items.map((item) => (
                <SidebarNavItem key={item.href} {...item} />
            ))}
        </nav>
    )
}
