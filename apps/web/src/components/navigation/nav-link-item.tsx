"use client"

import { cn } from "@workspace/ui/lib/utils"
import Link from "next/link"
import type { ReactNode } from "react"

/**
 * Navigation link item properties
 * @interface NavLinkItemProps
 */
export interface NavLinkItemProps {
  /** Link href */
  href: string
  /** Link label */
  label: string
  /** Whether the link is currently active */
  isActive?: boolean
  /** Optional icon */
  icon?: ReactNode
  /** Optional CSS classes */
  className?: string
  /** Optional click handler */
  onClick?: () => void
  /** Optional ARIA label (defaults to label) */
  ariaLabel?: string
  /** Optional tooltip text */
  tooltip?: string
  /** Optional external link flag */
  isExternal?: boolean
}

/**
 * Navigation link item component
 * @param props - Component properties
 * @returns Navigation link item component
 */
export function NavLinkItem({
  href,
  label,
  isActive = false,
  icon,
  className,
  onClick,
  ariaLabel,
  tooltip,
  isExternal = false
}: NavLinkItemProps) {
  const linkProps = {
    href,
    className: cn(
      "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md",
      isActive
        ? "bg-muted text-foreground"
        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
      className
    ),
    onClick,
    "aria-current": isActive ? ("page" as const) : undefined,
    "aria-label": ariaLabel || label,
    title: tooltip,
    ...(isExternal && {
      target: "_blank",
      rel: "noopener noreferrer"
    })
  }

  return (
    <Link {...linkProps}>
      {icon && (
        <span className='h-4 w-4' aria-hidden='true'>
          {icon}
        </span>
      )}
      <span>{label}</span>
      {isExternal && <span className='sr-only'>(opens in a new tab)</span>}
    </Link>
  )
}
