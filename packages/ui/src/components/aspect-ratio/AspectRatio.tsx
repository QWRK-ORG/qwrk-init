"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

import type { AspectRatioProps } from "./types.js"

/**
 * A container that maintains a specific aspect ratio
 *
 * @component
 * @public
 *
 * @example
 * ```tsx
 * <AspectRatio ratio={16 / 9}>
 *   <img src="..." alt="..." />
 * </AspectRatio>
 * ```
 *
 * @see {@link https://ui.shadcn.com/docs/components/aspect-ratio | Shadcn AspectRatio Documentation}
 * @see {@link https://www.radix-ui.com/primitives/docs/components/aspect-ratio | Radix AspectRatio Primitive}
 */
function AspectRatio({ ...props }: AspectRatioProps) {
    return <AspectRatioPrimitive.Root data-slot='aspect-ratio' {...props} />
}

export { AspectRatio }
