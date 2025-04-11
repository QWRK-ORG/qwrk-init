/**
 * Type definitions for the Combobox component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the Combobox component
 *
 * @public
 * @interface
 */
export interface ComboboxProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
