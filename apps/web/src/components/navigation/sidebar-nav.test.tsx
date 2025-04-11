import { Home, Settings } from "lucide-react"
import { describe, expect, it, vi } from "vitest"
import { render, screen } from "../../../tests/test-utils"
import { SidebarNav, SidebarNavItem } from "./sidebar-nav"

// Mock the useActivePath hook
vi.mock("@/hooks/use-active-path", () => ({
  useActivePath: () => (path: string) => path === "/dashboard"
}))

describe("SidebarNavItem", () => {
  it("renders correctly with label", () => {
    render(<SidebarNavItem href='/dashboard' label='Dashboard' />)

    expect(screen.getByText("Dashboard")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "href",
      "/dashboard"
    )
  })

  it("renders with icon", () => {
    render(
      <SidebarNavItem
        href='/home'
        label='Home'
        icon={<Home data-testid='home-icon' />}
      />
    )

    expect(screen.getByTestId("home-icon")).toBeInTheDocument()
  })

  it("renders with badge", () => {
    render(
      <SidebarNavItem
        href='/dashboard'
        label='Dashboard'
        badge={<span data-testid='badge'>New</span>}
      />
    )

    expect(screen.getByTestId("badge")).toBeInTheDocument()
  })

  it("applies active styling when current path matches", () => {
    render(<SidebarNavItem href='/dashboard' label='Dashboard' />)

    const link = screen.getByRole("link", { name: "Dashboard" })
    expect(link).toHaveClass("bg-muted")
    expect(link).toHaveClass("text-foreground")
  })

  it("applies inactive styling when current path doesn't match", () => {
    render(<SidebarNavItem href='/settings' label='Settings' />)

    const link = screen.getByRole("link", { name: "Settings" })
    expect(link).toHaveClass("text-muted-foreground")
  })

  it("renders children items when expanded", async () => {
    const { user } = render(
      <SidebarNavItem href='/settings' label='Settings'>
        {[
          { href: "/settings/profile", label: "Profile" },
          { href: "/settings/account", label: "Account" }
        ]}
      </SidebarNavItem>
    )

    // Initially, children should not be visible
    expect(screen.queryByText("Profile")).not.toBeInTheDocument()

    // Click the expand button
    const expandButton = screen.getByRole("button", { name: "Expand" })
    await user.click(expandButton)

    // Now children should be visible
    expect(screen.getByText("Profile")).toBeInTheDocument()
    expect(screen.getByText("Account")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(
      <SidebarNavItem
        href='/dashboard'
        label='Dashboard'
        className='custom-class'
      />
    )

    const item = screen.getByText("Dashboard").closest("div")?.parentElement
    expect(item).toHaveClass("custom-class")
  })
})

describe("SidebarNav", () => {
  const items = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Home data-testid='dashboard-icon' />
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings data-testid='settings-icon' />
    }
  ]

  it("renders all navigation items", () => {
    render(<SidebarNav items={items} />)

    expect(screen.getByText("Dashboard")).toBeInTheDocument()
    expect(screen.getByText("Settings")).toBeInTheDocument()
    expect(screen.getByTestId("dashboard-icon")).toBeInTheDocument()
    expect(screen.getByTestId("settings-icon")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(<SidebarNav items={items} className='custom-class' />)

    const nav = screen.getByRole("navigation")
    expect(nav).toHaveClass("custom-class")
  })
})
