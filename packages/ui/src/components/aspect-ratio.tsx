"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import type * as React from "react"

/**
 * AspectRatio component for maintaining consistent width-to-height ratio
 * Built on Radix UI AspectRatio primitive
 *
 * @example 16:9 aspect ratio for images or videos
 * ```tsx
 * <AspectRatio ratio={16 / 9}>
 *   <img
 *     src="https://example.com/image.jpg"
 *     alt="Example"
 *     className="h-full w-full object-cover"
 *   />
 * </AspectRatio>
 * ```
 *
 * @example Square aspect ratio with a video
 * ```tsx
 * <AspectRatio ratio={1}>
 *   <video src="/video.mp4" controls />
 * </AspectRatio>
 * ```
 */
function AspectRatio({
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot='aspect-ratio' {...props} />
}

export { AspectRatio }
