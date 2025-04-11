"use client"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { PanelLeft } from "lucide-react"
import { type ReactNode, useEffect, useState } from "react"
import { SidebarNav, type SidebarNavProps } from "./sidebar-nav"
import { TopNav, type TopNavProps } from "./top-nav"

/**
 * App layout properties
 * @interface AppLayoutProps
 */
export interface AppLayoutProps {
    /** Children content */
    children: ReactNode
    /** Top navigation props */
    topNavProps: TopNavProps
    /** Sidebar navigation props */
    sidebarProps: SidebarNavProps
    /** Whether the sidebar is collapsible */
    collapsibleSidebar?: boolean
    /** Default sidebar collapsed state */
    defaultCollapsed?: boolean
    /** Optional CSS classes for the layout */
    className?: string
    /** Optional CSS classes for the sidebar */
    sidebarClassName?: string
    /** Optional CSS classes for the main content */
    contentClassName?: string
}

/**
 * App layout component that combines top navigation and sidebar
 * @param props - Component properties
 * @returns App layout component
 */
export function AppLayout({
    children,
    topNavProps,
    sidebarProps,
    collapsibleSidebar = true,
    defaultCollapsed = false,
    className,
    sidebarClassName,
    contentClassName
}: AppLayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultCollapsed)
    const [isMounted, setIsMounted] = useState(false)

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <div className={cn("flex min-h-screen flex-col", className)}>
            <TopNav {...topNavProps} />

            <div className='flex flex-1'>
                {/* Sidebar */}
                <aside
                    className={cn(
                        "hidden border-r bg-background md:block",
                        sidebarCollapsed ? "w-[60px]" : "w-64",
                        "transition-all duration-300 ease-in-out",
                        sidebarClassName
                    )}
                >
                    <div className='flex h-full flex-col'>
                        {collapsibleSidebar && (
                            <div className='flex justify-end p-2'>
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                                    aria-label={
                                        sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                                    }
                                >
                                    <PanelLeft
                                        className={cn("h-4 w-4", sidebarCollapsed && "rotate-180")}
                                    />
                                </Button>
                            </div>
                        )}

                        <div className={cn("flex-1 overflow-auto p-4", sidebarCollapsed && "px-2")}>
                            {!sidebarCollapsed ? (
                                <SidebarNav {...sidebarProps} />
                            ) : (
                                <div className='flex flex-col items-center space-y-2 py-2'>
                                    {sidebarProps.items.map((item) => (
                                        <Button
                                            key={item.href}
                                            variant='ghost'
                                            size='icon'
                                            asChild
                                            className='h-9 w-9'
                                        >
                                            <a href={item.href} aria-label={item.label}>
                                                {item.icon || <span>{item.label.charAt(0)}</span>}
                                            </a>
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

                {/* Main content */}
                <main className={cn("flex-1", contentClassName)}>{children}</main>
            </div>
        </div>
    )
}
