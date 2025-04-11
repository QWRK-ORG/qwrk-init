"use client"

import { Button } from "@workspace/ui/components/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

/**
 * Theme switcher component properties
 * @interface ThemeSwitcherProps
 */
export interface ThemeSwitcherProps {
    /** Optional CSS classes */
    className?: string
}

/**
 * Theme switcher component that toggles between light and dark modes
 * @param props - Component properties
 * @returns Theme switcher component
 */
export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={className}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            {theme === "dark" ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
        </Button>
    )
}
