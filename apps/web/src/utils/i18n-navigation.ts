import type React from "react"
/**
 * Type for a localized navigation item
 * @interface LocalizedNavItem
 */
export interface LocalizedNavItem {
  /** Base path without locale prefix */
  basePath: string
  /** Translations for the label keyed by locale */
  labels: Record<string, string>
  /** Optional icon */
  icon?: React.ReactNode
  /** Optional children items */
  children?: LocalizedNavItem[]
}

/**
 * Type for a processed navigation item with localized values
 * @interface ProcessedNavItem
 */
export interface ProcessedNavItem {
  /** Full href with locale prefix if needed */
  href: string
  /** Localized label */
  label: string
  /** Optional icon */
  icon?: React.ReactNode
  /** Optional children items */
  children?: ProcessedNavItem[]
}

/**
 * Options for generating localized navigation
 * @interface GenerateLocalizedNavOptions
 */
export interface GenerateLocalizedNavOptions {
  /** Current locale */
  locale: string
  /** Whether to include the locale prefix in the href */
  includeLocalePrefix?: boolean
  /** Default locale (won't have prefix if includeLocalePrefix is true) */
  defaultLocale?: string
}

/**
 * Generates localized navigation items
 *
 * @example
 * ```tsx
 * const navItems = [
 *   {
 *     basePath: "/dashboard",
 *     labels: {
 *       en: "Dashboard",
 *       fr: "Tableau de bord",
 *       es: "Panel de control"
 *     },
 *     icon: <LayoutDashboard className="h-4 w-4" />
 *   },
 *   {
 *     basePath: "/settings",
 *     labels: {
 *       en: "Settings",
 *       fr: "Paramètres",
 *       es: "Configuración"
 *     },
 *     icon: <Settings className="h-4 w-4" />
 *   }
 * ];
 *
 * // Generate navigation items for French
 * const frNavItems = generateLocalizedNav(navItems, { locale: "fr" });
 * ```
 *
 * @param items - Localized navigation items
 * @param options - Options for generating localized navigation
 * @returns Localized navigation items ready for use in navigation components
 */
export function generateLocalizedNav(
  items: LocalizedNavItem[],
  options: GenerateLocalizedNavOptions
): ProcessedNavItem[] {
  const { locale, includeLocalePrefix = true, defaultLocale = "en" } = options

  return items.map((item) => {
    // Generate the href with locale prefix if needed
    const href =
      includeLocalePrefix && locale !== defaultLocale
        ? `/${locale}${item.basePath}`
        : item.basePath

    // Get the label for the current locale, fallback to default locale
    const label =
      item.labels[locale] ||
      item.labels[defaultLocale] ||
      Object.values(item.labels)[0] ||
      ""

    // Process children recursively if they exist
    const children = item.children
      ? generateLocalizedNav(item.children, options)
      : undefined

    return {
      href,
      label,
      icon: item.icon,
      ...(children && { children })
    }
  })
}
