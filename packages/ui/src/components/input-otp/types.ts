/**
 * Type definitions for the InputOtp component
 *
 * @packageDocumentation
 */

import type * as React from "react"

/**
 * Props for the InputOtp component
 *
 * @public
 * @interface
 */
export interface InputOtpProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS class names
     */
    className?: string
    /**
     * The content of the component
     */
    children?: React.ReactNode
}
