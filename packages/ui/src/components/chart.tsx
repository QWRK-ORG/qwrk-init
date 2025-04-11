"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@workspace/ui/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

/**
 * Configuration for chart styling and labels.
 * Defines how each data series in the chart should be styled and labeled.
 *
 * @example
 * ```tsx
 * const config: ChartConfig = {
 *   data1: {
 *     label: "Revenue",
 *     color: "#3b82f6"
 *   },
 *   data2: {
 *     label: "Expenses",
 *     theme: { light: "#ef4444", dark: "#f87171" }
 *   }
 * }
 * ```
 */
export type ChartConfig = {
  [k in string]: {
    /**
     * Display label for this data series
     */
    label?: React.ReactNode
    /**
     * Icon component to display next to the label
     */
    icon?: React.ComponentType
  } & (
    | {
        /**
         * Static color for all themes
         */
        color?: string
        theme?: never
      }
    | {
        color?: never
        /**
         * Theme-specific colors (light and dark mode)
         */
        theme: Record<keyof typeof THEMES, string>
      }
  )
}

/**
 * Internal context type for chart configuration
 * @internal
 */
type ChartContextProps = {
  /**
   * Configuration object for the chart
   */
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

/**
 * Hook to access chart configuration from context
 * Must be used within a ChartContainer component
 *
 * @returns Chart configuration context
 * @throws Error when used outside of a ChartContainer
 * @internal
 */
function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

/**
 * Main container component for charts
 * Provides configuration context and styling for nested chart components
 *
 * @example
 * ```tsx
 * <ChartContainer config={{
 *   data1: { label: "Revenue", color: "#3b82f6" },
 *   data2: { label: "Expenses", color: "#ef4444" }
 * }}>
 *   <AreaChart data={data}>
 *     <XAxis dataKey="month" />
 *     <YAxis />
 *     <Area dataKey="data1" />
 *     <Area dataKey="data2" />
 *   </AreaChart>
 * </ChartContainer>
 * ```
 */
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  /**
   * Configuration object defining styles and labels for chart data series
   */
  config: ChartConfig
  /**
   * Recharts chart component
   */
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot='chart'
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

/**
 * Internal component that generates CSS variables for chart styling
 * Handles theme switching between light and dark mode
 *
 * @internal
 */
const ChartStyle = ({
  id,
  config
}: {
  /**
   * Unique chart identifier
   */
  id: string
  /**
   * Chart configuration object
   */
  config: ChartConfig
}) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  // Create CSS variables for each theme
  const cssVariables = React.useMemo(() => {
    return Object.entries(THEMES).map(([theme, prefix]) => {
      const themeStyles = colorConfig
        .map(([key, itemConfig]) => {
          const color =
            itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
            itemConfig.color
          return color ? `--color-${key}: ${color};` : ""
        })
        .filter(Boolean)
        .join(" ")

      // Return a className and its associated styles
      return {
        selector: `${prefix} [data-chart=${id}]`,
        styles: themeStyles
      }
    })
  }, [id, colorConfig])

  // Use useEffect to add/remove styles from the document
  React.useEffect(() => {
    // Create a stylesheet
    const stylesheet = document.createElement("style")
    stylesheet.type = "text/css"

    // Add all theme styles
    const cssRules = cssVariables
      .map(({ selector, styles }) => `${selector} { ${styles} }`)
      .join("\n")

    stylesheet.textContent = cssRules
    document.head.appendChild(stylesheet)

    // Cleanup function to remove the stylesheet when component unmounts
    return () => {
      document.head.removeChild(stylesheet)
    }
  }, [cssVariables])

  return null
}

/**
 * Tooltip component for displaying chart data on hover
 * Re-export of Recharts Tooltip component
 */
const ChartTooltip = RechartsPrimitive.Tooltip

/**
 * Customizable tooltip content component for displaying chart data on hover
 *
 * @example
 * ```tsx
 * <LineChart data={data}>
 *   <Line dataKey="value" />
 *   <ChartTooltip content={<ChartTooltipContent />} />
 * </LineChart>
 * ```
 *
 * @example With custom formatting
 * ```tsx
 * <LineChart data={data}>
 *   <Line dataKey="value" />
 *   <ChartTooltip content={
 *     <ChartTooltipContent
 *       formatter={(value) => `$${value}`}
 *       indicator="line"
 *     />
 *   } />
 * </LineChart>
 * ```
 */
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    /**
     * Whether to hide the tooltip label
     * @default false
     */
    hideLabel?: boolean
    /**
     * Whether to hide the color indicator
     * @default false
     */
    hideIndicator?: boolean
    /**
     * Style of the color indicator
     * @default "dot"
     */
    indicator?: "line" | "dot" | "dashed"
    /**
     * Key to use for accessing the item name
     */
    nameKey?: string
    /**
     * Key to use for accessing the label
     */
    labelKey?: string
  }) {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === "string"
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className='grid gap-1.5'>
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          const indicatorColor = color || item.payload.fill || item.color

          return (
            <div
              key={item.dataKey}
              className={cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center"
              )}
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn(
                          "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                          {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent":
                              indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed"
                          }
                        )}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <div
                    className={cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    )}
                  >
                    <div className='grid gap-1.5'>
                      {nestLabel ? tooltipLabel : null}
                      <span className='text-muted-foreground'>
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value && (
                      <span className='text-foreground font-mono font-medium tabular-nums'>
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Legend component for displaying chart series information
 * Re-export of Recharts Legend component
 */
const ChartLegend = RechartsPrimitive.Legend

/**
 * Customizable legend content component for displaying chart series information
 *
 * @example
 * ```tsx
 * <LineChart data={data}>
 *   <Line dataKey="value" />
 *   <ChartLegend content={<ChartLegendContent />} />
 * </LineChart>
 * ```
 *
 * @example With custom alignment
 * ```tsx
 * <LineChart data={data}>
 *   <Line dataKey="value" />
 *   <ChartLegend
 *     content={<ChartLegendContent verticalAlign="top" />}
 *   />
 * </LineChart>
 * ```
 */
function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey
}: React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    /**
     * Whether to hide the color icon
     * @default false
     */
    hideIcon?: boolean
    /**
     * Key to use for accessing the item name
     */
    nameKey?: string
  }) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)

        return (
          <div
            key={item.value}
            className={cn(
              "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className='h-2 w-2 shrink-0 rounded-[2px]'
                style={{
                  backgroundColor: item.color
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        )
      })}
    </div>
  )
}

/**
 * Helper to extract item configuration from a payload object
 *
 * @param config - Chart configuration object
 * @param payload - Payload object from Recharts
 * @param key - Key to lookup in the payload
 * @returns The configuration for the specified key, or undefined if not found
 * @internal
 */
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle
}
