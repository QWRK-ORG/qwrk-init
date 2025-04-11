"use client"

import { ThemeSwitcher } from "@/components/theme-switcher"
import { useNavigationStore } from "@/stores/navigation-store"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { type ReactNode, useEffect, useState } from "react"

/**
 * Mobile navigation properties
 * @interface MobileNavProps
 */
export interface MobileNavProps {
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
}

/**
 * Mobile navigation component with a simple drawer implementation
 * @param props - Component properties
 * @returns Mobile navigation component
 */
export function MobileNav({
  logo,
  navItems,
  actions,
  userProfile,
  showThemeSwitcher = true
}: MobileNavProps) {
  // Use navigation store for mobile nav state
  const isOpen = useNavigationStore((state) => state.isMobileNavOpen)
  const openNav = useNavigationStore((state) => state.openMobileNav)
  const closeNav = useNavigationStore((state) => state.closeMobileNav)

  const [isMounted, setIsMounted] = useState(false)

  // Close the drawer when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const drawer = document.getElementById("mobile-drawer")
      if (drawer && !drawer.contains(event.target as Node) && isOpen) {
        closeNav()
      }
    }

    // Close drawer on escape key
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        closeNav()
      }
    }

    // Prevent scrolling when drawer is open
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscKey)

    // Prevent hydration mismatch
    setIsMounted(true)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, closeNav])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Button
        variant='ghost'
        size='icon'
        onClick={openNav}
        aria-label='Open menu'
        className='md:hidden'
      >
        <Menu className='h-6 w-6' />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 md:hidden'
          onClick={closeNav}
          onKeyDown={closeNav}
        />
      )}

      {/* Drawer */}
      <div
        id='mobile-drawer'
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-background shadow-lg transform transition-transform duration-200 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className='flex flex-col h-full'>
          {/* Header with logo and close button */}
          <div className='flex items-center justify-between p-4 border-b'>
            <div>{logo}</div>
            <Button
              variant='ghost'
              size='icon'
              onClick={closeNav}
              aria-label='Close menu'
            >
              <X className='h-5 w-5' />
            </Button>
          </div>

          {/* Navigation items */}
          <nav className='flex-1 overflow-auto p-4'>
            <ul className='space-y-2'>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      item.isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                    onClick={closeNav}
                  >
                    {item.icon && <span className='h-4 w-4'>{item.icon}</span>}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer with actions and user profile */}
          <div className='border-t p-4 space-y-4'>
            {actions && <div>{actions}</div>}
            <div className='flex items-center justify-between'>
              {userProfile && <div>{userProfile}</div>}
              {showThemeSwitcher && <ThemeSwitcher />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
