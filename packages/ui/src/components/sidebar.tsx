"use client"

import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Separator } from "@workspace/ui/components/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@workspace/ui/components/sheet"
import { Skeleton } from "@workspace/ui/components/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@workspace/ui/components/tooltip"
import { useIsMobile } from "@workspace/ui/hooks/use-mobile"
import { cn } from "@workspace/ui/lib/utils"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

/**
 * Props for the Sidebar context to manage sidebar state
 */
type SidebarContextProps = {
  /**
   * Current visual state of the sidebar
   */
  state: "expanded" | "collapsed"
  /**
   * Whether the sidebar is open on desktop
   */
  open: boolean
  /**
   * Function to set the open state on desktop
   */
  setOpen: (open: boolean) => void
  /**
   * Whether the sidebar is open on mobile
   */
  openMobile: boolean
  /**
   * Function to set the open state on mobile
   */
  setOpenMobile: (open: boolean) => void
  /**
   * Whether the current viewport is mobile
   */
  isMobile: boolean
  /**
   * Function to toggle the sidebar open/closed
   */
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

/**
 * Hook to access sidebar state and controls from any component
 *
 * @example
 * ```tsx
 * function SidebarButton() {
 *   const { toggleSidebar } = useSidebar()
 *   return <button onClick={toggleSidebar}>Toggle Sidebar</button>
 * }
 * ```
 *
 * @returns The sidebar context object
 * @throws Error when used outside of a SidebarProvider
 */
function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

/**
 * Provider component for sidebar state management
 * Must wrap any components that need access to sidebar state
 *
 * @example Basic usage
 * ```tsx
 * <SidebarProvider>
 *   <YourApp />
 * </SidebarProvider>
 * ```
 *
 * @example Controlled state
 * ```tsx
 * <SidebarProvider
 *   open={sidebarOpen}
 *   onOpenChange={setSidebarOpen}
 * >
 *   <YourApp />
 * </SidebarProvider>
 * ```
 */
function SidebarProvider({
  /**
   * Whether the sidebar should be open by default
   * @default true
   */
  defaultOpen = true,
  /**
   * Controlled open state
   */
  open: openProp,
  /**
   * Callback when open state changes
   */
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /**
   * Whether the sidebar should be open by default
   * @default true
   */
  defaultOpen?: boolean
  /**
   * Controlled open state
   */
  open?: boolean
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot='sidebar-wrapper'
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

/**
 * Sidebar component for application navigation and content organization
 * Provides responsive behavior for desktop and mobile views
 *
 * @example Basic usage
 * ```tsx
 * <SidebarProvider>
 *   <Sidebar>
 *     <SidebarHeader>My App</SidebarHeader>
 *     <SidebarContent>
 *       <SidebarMenu>
 *         <SidebarMenuItem>
 *           <SidebarMenuButton>Dashboard</SidebarMenuButton>
 *         </SidebarMenuItem>
 *       </SidebarMenu>
 *     </SidebarContent>
 *   </Sidebar>
 *   <SidebarInset>
 *     <YourAppContent />
 *   </SidebarInset>
 * </SidebarProvider>
 * ```
 *
 * @example With floating variant and right side
 * ```tsx
 * <Sidebar
 *   variant="floating"
 *   side="right"
 *   collapsible="icon"
 * >
 * </Sidebar>
 * ```
 */
function Sidebar({
  /**
   * Which side of the screen to display the sidebar
   * @default "left"
   */
  side = "left",
  /**
   * Visual style of the sidebar
   * - sidebar: Standard full-height sidebar with border
   * - floating: Elevated sidebar with shadow and border
   * - inset: Sidebar that is part of the layout without border
   * @default "sidebar"
   */
  variant = "sidebar",
  /**
   * How the sidebar behaves when collapsed
   * - offcanvas: Slides off screen when collapsed
   * - icon: Collapses to icon-only view
   * - none: Cannot be collapsed
   * @default "offcanvas"
   */
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /**
   * Which side of the screen to display the sidebar
   */
  side?: "left" | "right"
  /**
   * Visual style of the sidebar
   */
  variant?: "sidebar" | "floating" | "inset"
  /**
   * How the sidebar behaves when collapsed
   */
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot='sidebar'
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar='sidebar'
          data-slot='sidebar'
          data-mobile='true'
          className='bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden'
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className='sr-only'>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className='flex h-full w-full flex-col'>{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className='group peer text-sidebar-foreground hidden md:block'
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot='sidebar'
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot='sidebar-gap'
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot='sidebar-container'
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar='sidebar'
          data-slot='sidebar-inner'
          className='bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm'
        >
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * Button component that toggles the sidebar open/closed
 * Automatically toggles the appropriate state based on viewport size
 *
 * @example
 * ```tsx
 * <SidebarTrigger />
 * ```
 *
 * @example With custom styling
 * ```tsx
 * <SidebarTrigger className="my-custom-class" />
 * ```
 */
function SidebarTrigger({
  /**
   * Additional CSS class names
   */
  className,
  /**
   * Optional click handler that runs before toggling the sidebar
   */
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar='trigger'
      data-slot='sidebar-trigger'
      variant='ghost'
      size='icon'
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className='sr-only'>Toggle Sidebar</span>
    </Button>
  )
}

/**
 * SidebarRail component that provides a drag handle at the sidebar edge
 * Allows user to expand/collapse the sidebar by clicking on the rail
 *
 * @example
 * ```tsx
 * <SidebarRail />
 * ```
 */
function SidebarRail({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar='rail'
      data-slot='sidebar-rail'
      aria-label='Toggle Sidebar'
      tabIndex={-1}
      onClick={toggleSidebar}
      title='Toggle Sidebar'
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarInset component that serves as the main content area alongside the sidebar
 * Automatically adjusts layout based on sidebar state
 *
 * @example
 * ```tsx
 * <SidebarProvider>
 *   <Sidebar>...</Sidebar>
 *   <SidebarInset>
 *     <YourAppContent />
 *   </SidebarInset>
 * </SidebarProvider>
 * ```
 */
function SidebarInset({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      data-slot='sidebar-inset'
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarInput component styled to match the sidebar design
 * Commonly used for search functionality within the sidebar
 *
 * @example
 * ```tsx
 * <SidebarInput placeholder="Search..." />
 * ```
 */
function SidebarInput({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot='sidebar-input'
      data-sidebar='input'
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  )
}

/**
 * SidebarHeader component for the top section of a sidebar
 * Commonly used for logo, app name, or primary navigation elements
 *
 * @example
 * ```tsx
 * <SidebarHeader>
 *   <div className="flex items-center gap-2">
 *     <Logo />
 *     <h1 className="text-lg font-semibold">My App</h1>
 *   </div>
 * </SidebarHeader>
 * ```
 */
function SidebarHeader({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='sidebar-header'
      data-sidebar='header'
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

/**
 * SidebarFooter component for the bottom section of a sidebar
 * Commonly used for user profile, logout button, or secondary actions
 *
 * @example
 * ```tsx
 * <SidebarFooter>
 *   <div className="flex items-center gap-2">
 *     <Avatar src="/user-avatar.jpg" />
 *     <div className="flex flex-col">
 *       <span className="text-sm font-medium">Jane Doe</span>
 *       <span className="text-xs text-muted-foreground">jane@example.com</span>
 *     </div>
 *   </div>
 * </SidebarFooter>
 * ```
 */
function SidebarFooter({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='sidebar-footer'
      data-sidebar='footer'
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

/**
 * SidebarSeparator component for creating visual dividers in the sidebar
 * Styled specifically for the sidebar context
 *
 * @example
 * ```tsx
 * <SidebarContent>
 *   <SidebarMenu>...</SidebarMenu>
 *   <SidebarSeparator />
 *   <SidebarMenu>...</SidebarMenu>
 * </SidebarContent>
 * ```
 */
function SidebarSeparator({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot='sidebar-separator'
      data-sidebar='separator'
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  )
}

/**
 * SidebarContent component for the main content area of the sidebar
 * Contains the primary navigation elements and other sidebar content
 *
 * @example
 * ```tsx
 * <SidebarContent>
 *   <SidebarMenu>
 *     <SidebarMenuItem>
 *       <SidebarMenuButton>
 *         <HomeIcon />
 *         <span>Dashboard</span>
 *       </SidebarMenuButton>
 *     </SidebarMenuItem>
 *   </SidebarMenu>
 * </SidebarContent>
 * ```
 */
function SidebarContent({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='sidebar-content'
      data-sidebar='content'
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarGroup component for organizing related sidebar items into sections
 * Typically contains a label, optional action button, and content
 *
 * @example
 * ```tsx
 * <SidebarGroup>
 *   <SidebarGroupLabel>Navigation</SidebarGroupLabel>
 *   <SidebarGroupContent>
 *     <SidebarMenu>
 *       <SidebarMenuItem>
 *         <SidebarMenuButton>Dashboard</SidebarMenuButton>
 *       </SidebarMenuItem>
 *     </SidebarMenu>
 *   </SidebarGroupContent>
 * </SidebarGroup>
 * ```
 */
function SidebarGroup({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='sidebar-group'
      data-sidebar='group'
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}

/**
 * SidebarGroupLabel component for labeling a group of sidebar items
 * Used as a header for a section within the sidebar
 *
 * @example
 * ```tsx
 * <SidebarGroup>
 *   <SidebarGroupLabel>Navigation</SidebarGroupLabel>
 *   <SidebarGroupContent>
 *     <SidebarMenu>...</SidebarMenu>
 *   </SidebarGroupContent>
 * </SidebarGroup>
 * ```
 *
 * @example With custom element
 * ```tsx
 * <SidebarGroup>
 *   <SidebarGroupLabel asChild>
 *     <h3>Main Menu</h3>
 *   </SidebarGroupLabel>
 *   <SidebarGroupContent>...</SidebarGroupContent>
 * </SidebarGroup>
 * ```
 */
function SidebarGroupLabel({
  /**
   * Additional CSS class names
   */
  className,
  /**
   * Whether to use a custom element via Radix Slot
   * @default false
   */
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot='sidebar-group-label'
      data-sidebar='group-label'
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarGroupAction component for providing actions related to a group
 * Usually displayed as a small button at the top-right of a group
 *
 * @example
 * ```tsx
 * <SidebarGroup>
 *   <SidebarGroupLabel>Projects</SidebarGroupLabel>
 *   <SidebarGroupAction>
 *     <PlusIcon />
 *   </SidebarGroupAction>
 *   <SidebarGroupContent>...</SidebarGroupContent>
 * </SidebarGroup>
 * ```
 */
function SidebarGroupAction({
  /**
   * Additional CSS class names
   */
  className,
  /**
   * Whether to use a custom element via Radix Slot
   * @default false
   */
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot='sidebar-group-action'
      data-sidebar='group-action'
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarGroupContent component for containing navigation items within a group
 * Usually contains a SidebarMenu component
 *
 * @example
 * ```tsx
 * <SidebarGroupContent>
 *   <SidebarMenu>
 *     <SidebarMenuItem>
 *       <SidebarMenuButton>Dashboard</SidebarMenuButton>
 *     </SidebarMenuItem>
 *   </SidebarMenu>
 * </SidebarGroupContent>
 * ```
 */
function SidebarGroupContent({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='sidebar-group-content'
      data-sidebar='group-content'
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}

/**
 * SidebarMenu component for grouping related navigation items
 * Contains SidebarMenuItem components
 *
 * @example
 * ```tsx
 * <SidebarMenu>
 *   <SidebarMenuItem>
 *     <SidebarMenuButton>Dashboard</SidebarMenuButton>
 *   </SidebarMenuItem>
 *   <SidebarMenuItem>
 *     <SidebarMenuButton>Settings</SidebarMenuButton>
 *   </SidebarMenuItem>
 * </SidebarMenu>
 * ```
 */
function SidebarMenu({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot='sidebar-menu'
      data-sidebar='menu'
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

/**
 * SidebarMenuItem component representing a single navigation item
 * Usually contains a SidebarMenuButton and optionally a SidebarMenuAction
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>
 *     <HomeIcon />
 *     <span>Dashboard</span>
 *   </SidebarMenuButton>
 * </SidebarMenuItem>
 * ```
 *
 * @example With action button
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>
 *     <span>Settings</span>
 *   </SidebarMenuButton>
 *   <SidebarMenuAction>
 *     <MoreHorizontalIcon />
 *   </SidebarMenuAction>
 * </SidebarMenuItem>
 * ```
 */
function SidebarMenuItem({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot='sidebar-menu-item'
      data-sidebar='menu-item'
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

/**
 * SidebarMenuButton component for clickable navigation items within the sidebar
 * Supports different visual styles, sizes, and tooltip display in collapsed state
 *
 * @example Basic usage
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>
 *     <HomeIcon />
 *     <span>Dashboard</span>
 *   </SidebarMenuButton>
 * </SidebarMenuItem>
 * ```
 *
 * @example With tooltip for collapsed state
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton tooltip="Settings">
 *     <SettingsIcon />
 *     <span>Settings</span>
 *   </SidebarMenuButton>
 * </SidebarMenuItem>
 * ```
 *
 * @example With active state
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton isActive>
 *     <UserIcon />
 *     <span>Profile</span>
 *   </SidebarMenuButton>
 * </SidebarMenuItem>
 * ```
 */
function SidebarMenuButton({
  /**
   * Whether to use a custom element via Radix Slot
   * @default false
   */
  asChild = false,
  /**
   * Whether this menu item is currently active/selected
   * @default false
   */
  isActive = false,
  /**
   * Visual style variant
   * @default "default"
   */
  variant = "default",
  /**
   * Size variant of the button
   * @default "default"
   */
  size = "default",
  /**
   * Tooltip text or Tooltip props to show when sidebar is collapsed
   */
  tooltip,
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot='sidebar-menu-button'
      data-sidebar='menu-button'
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side='right'
        align='center'
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

/**
 * SidebarMenuAction component for adding a contextual action button to a menu item
 * Positioned at the right side of the menu item, can be shown on hover
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>Documents</SidebarMenuButton>
 *   <SidebarMenuAction>
 *     <PlusIcon />
 *   </SidebarMenuAction>
 * </SidebarMenuItem>
 * ```
 *
 * @example With hover behavior
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>Projects</SidebarMenuButton>
 *   <SidebarMenuAction showOnHover>
 *     <MoreHorizontalIcon />
 *   </SidebarMenuAction>
 * </SidebarMenuItem>
 * ```
 */
function SidebarMenuAction({
  /**
   * Additional CSS class names
   */
  className,
  /**
   * Whether to use a custom element via Radix Slot
   * @default false
   */
  asChild = false,
  /**
   * Whether to only show the action on hover
   * @default false
   */
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot='sidebar-menu-action'
      data-sidebar='menu-action'
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarMenuBadge component for displaying notification counts or status indicators
 * Positioned at the right side of a menu item
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>
 *     <InboxIcon />
 *     <span>Messages</span>
 *   </SidebarMenuButton>
 *   <SidebarMenuBadge>5</SidebarMenuBadge>
 * </SidebarMenuItem>
 * ```
 */
function SidebarMenuBadge({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='sidebar-menu-badge'
      data-sidebar='menu-badge'
      className={cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarMenuSkeleton component for displaying loading states in the sidebar
 * Shows animated skeleton placeholders for menu items that are still loading
 *
 * @example Basic usage
 * ```tsx
 * <SidebarMenu>
 *   <SidebarMenuSkeleton />
 *   <SidebarMenuSkeleton />
 *   <SidebarMenuSkeleton />
 * </SidebarMenu>
 * ```
 *
 * @example With icon placeholder
 * ```tsx
 * <SidebarMenu>
 *   <SidebarMenuSkeleton showIcon />
 *   <SidebarMenuSkeleton showIcon />
 * </SidebarMenu>
 * ```
 */
function SidebarMenuSkeleton({
  /**
   * Additional CSS class names
   */
  className,
  /**
   * Whether to show an icon placeholder on the left side
   * @default false
   */
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot='sidebar-menu-skeleton'
      data-sidebar='menu-skeleton'
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className='size-4 rounded-md'
          data-sidebar='menu-skeleton-icon'
        />
      )}
      <Skeleton
        className='h-4 max-w-(--skeleton-width) flex-1'
        data-sidebar='menu-skeleton-text'
        style={
          {
            "--skeleton-width": width
          } as React.CSSProperties
        }
      />
    </div>
  )
}

/**
 * SidebarMenuSub component for creating nested submenus within a sidebar menu
 * Displayed as an indented list with a vertical border
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>
 *     <FolderIcon />
 *     <span>Projects</span>
 *   </SidebarMenuButton>
 *   <SidebarMenuSub>
 *     <SidebarMenuSubItem>
 *       <SidebarMenuSubButton>Project 1</SidebarMenuSubButton>
 *     </SidebarMenuSubItem>
 *     <SidebarMenuSubItem>
 *       <SidebarMenuSubButton>Project 2</SidebarMenuSubButton>
 *     </SidebarMenuSubItem>
 *   </SidebarMenuSub>
 * </SidebarMenuItem>
 * ```
 */
function SidebarMenuSub({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot='sidebar-menu-sub'
      data-sidebar='menu-sub'
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

/**
 * SidebarMenuSubItem component for individual items within a submenu
 * Used as a container for SidebarMenuSubButton
 *
 * @example
 * ```tsx
 * <SidebarMenuSub>
 *   <SidebarMenuSubItem>
 *     <SidebarMenuSubButton>Nested Item</SidebarMenuSubButton>
 *   </SidebarMenuSubItem>
 * </SidebarMenuSub>
 * ```
 */
function SidebarMenuSubItem({
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot='sidebar-menu-sub-item'
      data-sidebar='menu-sub-item'
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

/**
 * SidebarMenuSubButton component for submenu navigation items
 * Used within SidebarMenuSubItem components for nested navigation
 *
 * @example
 * ```tsx
 * <SidebarMenuSub>
 *   <SidebarMenuSubItem>
 *     <SidebarMenuSubButton>
 *       <span>Sub Item 1</span>
 *     </SidebarMenuSubButton>
 *   </SidebarMenuSubItem>
 * </SidebarMenuSub>
 * ```
 *
 * @example With active state and smaller size
 * ```tsx
 * <SidebarMenuSubItem>
 *   <SidebarMenuSubButton isActive size="sm">
 *     <span>Settings</span>
 *   </SidebarMenuSubButton>
 * </SidebarMenuSubItem>
 * ```
 */
function SidebarMenuSubButton({
  /**
   * Whether to use a custom element via Radix Slot
   * @default false
   */
  asChild = false,
  /**
   * Size variant of the button
   * @default "md"
   */
  size = "md",
  /**
   * Whether this menu item is currently active/selected
   * @default false
   */
  isActive = false,
  /**
   * Additional CSS class names
   */
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot='sidebar-menu-sub-button'
      data-sidebar='menu-sub-button'
      data-size={size}
      data-active={isActive}
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
}
