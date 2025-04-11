"use client"

import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/**
 * One-Time Password input component for verification codes, PIN codes, etc.
 * Built on the input-otp library for accessibility and ease of use.
 *
 * @example Basic usage
 * ```tsx
 * <InputOTP maxLength={6}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *     <InputOTPSlot index={2} />
 *     <InputOTPSeparator />
 *     <InputOTPSlot index={3} />
 *     <InputOTPSlot index={4} />
 *     <InputOTPSlot index={5} />
 *   </InputOTPGroup>
 * </InputOTP>
 * ```
 *
 * @example With validation
 * ```tsx
 * <InputOTP maxLength={4} value="1234" disabled>
 *   <InputOTPGroup>
 *     {Array.from({ length: 4 }).map((_, i) => (
 *       <InputOTPSlot key={i} index={i} />
 *     ))}
 *   </InputOTPGroup>
 * </InputOTP>
 * ```
 */
function InputOTP({
  /**
   * Additional CSS class names for the input
   */
  className,
  /**
   * Additional CSS class names for the container
   */
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  /**
   * Optional class name for the container element
   */
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot='input-otp'
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

/**
 * Container component for InputOTPSlot elements
 * Arranges OTP input slots in a horizontal layout
 *
 * @example
 * ```tsx
 * <InputOTPGroup>
 *   <InputOTPSlot index={0} />
 *   <InputOTPSlot index={1} />
 *   <InputOTPSlot index={2} />
 * </InputOTPGroup>
 * ```
 */
function InputOTPGroup({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='input-otp-group'
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

/**
 * Individual input slot for a single character in the OTP
 * Must be used within InputOTPGroup and connected to an InputOTP
 *
 * @example
 * ```tsx
 * <InputOTPSlot index={0} />
 * ```
 */
function InputOTPSlot({
  /**
   * Zero-based index position of this slot within the OTP
   */
  index,
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div"> & {
  /**
   * The position of this slot in the OTP input (0-based)
   * Must match the position in the OTP sequence
   */
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot='input-otp-slot'
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <div className='animate-caret-blink bg-foreground h-4 w-px duration-1000' />
        </div>
      )}
    </div>
  )
}

/**
 * Visual separator between OTP input slots
 * Renders a minus icon by default
 *
 * @example
 * ```tsx
 * <InputOTPGroup>
 *   <InputOTPSlot index={0} />
 *   <InputOTPSlot index={1} />
 *   <InputOTPSeparator />
 *   <InputOTPSlot index={2} />
 *   <InputOTPSlot index={3} />
 * </InputOTPGroup>
 * ```
 */
function InputOTPSeparator({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='input-otp-separator'
      className={cn("flex items-center justify-center", className)}
      aria-hidden='true'
      {...props}
    >
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
