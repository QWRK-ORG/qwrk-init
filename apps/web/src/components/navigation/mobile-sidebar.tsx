"use client"

import { Button } from "@workspace/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@workspace/ui/components/sheet"
import { cn } from "@workspace/ui/lib/utils"
import { Menu } from "lucide-react"
import { type ReactNode, useEffect, useState } from "react"
import { NavLinkItem, type NavLinkItemProps } from "./nav-link-item"

/**
 * Mobile sidebar properties
 * @interface MobileSidebarProps
 */
export interface MobileSidebarProps {
  /** Navigation items to display in the sidebar */
  navItems: Omit<NavLinkItemProps, "onClick">[]
  /** Optional logo component to display at the top of the sidebar */
  logo?: ReactNode
  /** Optional additional content to display at the bottom of the sidebar */
  additionalContent?: ReactNode
  /** Optional CSS classes for the trigger button */
  triggerClassName?: string
  /** Optional CSS classes for the sidebar content */
  contentClassName?: string
}

/**
 * Mobile sidebar component that displays a hamburger menu trigger and a slide-out drawer
 * @param props - Component properties
 * @returns Mobile sidebar component
 */
export function MobileSidebar({
  navItems,
  logo,
  additionalContent,
  triggerClassName,
  contentClassName
}: MobileSidebarProps) {
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <Button
        variant='ghost'
        size='icon'
        className={triggerClassName}
        aria-label='Toggle menu'
      >
        <Menu className='h-6 w-6' />
      </Button>
    )
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className={triggerClassName}
          aria-label='Toggle menu'
        >
          <Menu className='h-6 w-6' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className={cn("p-0", contentClassName)}>
        <div className='flex flex-col h-full'>
          {logo && <div className='p-4 border-b'>{logo}</div>}
          <nav className='flex-1 overflow-auto p-4'>
            <ul className='space-y-2'>
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLinkItem {...item} />
                </li>
              ))}
            </ul>
          </nav>
          {additionalContent && (
            <div className='border-t p-4'>{additionalContent}</div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
