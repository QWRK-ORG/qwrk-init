"use client"

import { ThemeSwitcher } from "@/components/theme-switcher"
import { useNavigationStore } from "@/stores/navigation-store"
import { cn } from "@workspace/ui/lib/utils"
import Link from "next/link"
import type { ReactNode } from "react"
import { Breadcrumbs } from "./breadcrumbs"
import { MobileNav } from "./mobile-nav"
/**
 * Navigation link item properties
 * @interface NavItemProps
 */
export interface NavItemProps {
    /** Link href */
    href: string
    /** Whether the link is currently active */
    isActive?: boolean
    /** Link label */
    children: ReactNode
    /** Optional CSS classes */
    className?: string
}

/**
 * Navigation link item component
 * @param props - Component properties
 * @returns Navigation link item component
 */
export const NavItem = ({ href, isActive, children, className }: NavItemProps) => {
    return (
        <Link
            href={href}
            className={cn(
                "px-4 py-2 text-sm font-medium transition-colors hover:text-foreground/80",
                isActive ? "text-foreground" : "text-foreground/60",
                className
            )}
        >
            {children}
        </Link>
    )
}

/**
 * Top navigation properties
 * @interface TopNavProps
 */
export interface TopNavProps {
    /** Logo component or element */
    logo: ReactNode
    /** Navigation items */
    navItems: Array<{
        href: string
        label: string
        isActive?: boolean
        icon?: ReactNode
    }>
    /** Right side actions */
    actions?: ReactNode
    /** User profile component */
    userProfile?: ReactNode
    /** Whether to show the theme switcher */
    showThemeSwitcher?: boolean
    /** Optional CSS classes */
    className?: string
}

/**
 * Top navigation component
 * @param props - Component properties
 * @returns Top navigation component
 */
export function TopNav({
    logo,
    navItems,
    actions,
    userProfile,
    showThemeSwitcher = true,
    className
}: TopNavProps) {
    // Get breadcrumbs from the navigation store
    const breadcrumbs = useNavigationStore((state) => state.breadcrumbs)

    return (
        <header className={cn("w-full border-b bg-background", className)}>
            <div className='container flex h-16 items-center justify-between px-4 md:px-6'>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center'>{logo}</div>
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <div className='md:hidden'>
                            <Breadcrumbs items={breadcrumbs} />
                        </div>
                    )}
                    <nav className='hidden md:flex items-center space-x-2'>
                        {navItems.map((item) => (
                            <NavItem key={item.href} href={item.href} isActive={item.isActive}>
                                {item.label}
                            </NavItem>
                        ))}
                    </nav>
                </div>
                <div className='flex items-center gap-4'>
                    {showThemeSwitcher && <ThemeSwitcher className='hidden md:flex' />}
                    <div className='hidden md:flex'>{actions}</div>
                    <div className='hidden md:flex'>{userProfile}</div>
                    <MobileNav
                        logo={logo}
                        navItems={navItems}
                        actions={actions}
                        userProfile={userProfile}
                        showThemeSwitcher={showThemeSwitcher}
                    />
                </div>
            </div>
        </header>
    )
}
