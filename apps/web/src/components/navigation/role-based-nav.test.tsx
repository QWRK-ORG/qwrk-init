import { FileText, Home, Settings } from "lucide-react"
import type React from "react"
import { describe, expect, it } from "vitest"
import { render, screen } from "../../../tests/test-utils"
import { RoleBasedNav } from "./role-based-nav"

describe("RoleBasedNav", () => {
  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Home data-testid='dashboard-icon' />
    },
    {
      href: "/admin",
      label: "Admin",
      icon: <Settings data-testid='admin-icon' />,
      allowedRoles: ["admin"]
    },
    {
      href: "/reports",
      label: "Reports",
      icon: <FileText data-testid='reports-icon' />,
      allowedRoles: ["admin", "manager"]
    }
  ]

  it("renders items with no role restrictions", () => {
    render(<RoleBasedNav items={navItems} userRoles={["user"]} />)

    // Dashboard has no role restrictions, so it should be visible
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
    expect(screen.getByTestId("dashboard-icon")).toBeInTheDocument()

    // Admin and Reports require specific roles, so they should not be visible
    expect(screen.queryByText("Admin")).not.toBeInTheDocument()
    expect(screen.queryByText("Reports")).not.toBeInTheDocument()
  })

  it("renders items based on user roles", () => {
    render(<RoleBasedNav items={navItems} userRoles={["user", "admin"]} />)

    // User has admin role, so both Dashboard and Admin should be visible
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
    expect(screen.getByText("Admin")).toBeInTheDocument()

    // Reports requires admin or manager role, so it should be visible
    expect(screen.getByText("Reports")).toBeInTheDocument()
  })

  it("renders nothing when no items match user roles", () => {
    const restrictedItems = [
      { href: "/admin", label: "Admin", allowedRoles: ["admin"] },
      { href: "/reports", label: "Reports", allowedRoles: ["manager"] }
    ]

    const { container } = render(
      <RoleBasedNav items={restrictedItems} userRoles={["user"]} />
    )

    // No items should be rendered
    expect(container.firstChild).toBeNull()
  })

  it("applies custom className to the list", () => {
    render(
      <RoleBasedNav
        items={navItems}
        userRoles={["admin"]}
        className='custom-class'
      />
    )

    const list = screen.getByRole("list")
    expect(list).toHaveClass("custom-class")
  })

  it("applies custom className to list items", () => {
    render(
      <RoleBasedNav
        items={navItems}
        userRoles={["admin"]}
        itemClassName='item-class'
      />
    )

    // Get all NavLinkItem components
    const links = screen.getAllByRole("link")

    // Each link should have the custom class
    for (const link of links) {
      expect(link).toHaveClass("item-class")
    }
  })

  it("uses custom wrapper when provided", () => {
    const wrapper = (children: React.ReactNode) => (
      <div data-testid='custom-wrapper'>{children}</div>
    )

    render(
      <RoleBasedNav items={navItems} userRoles={["admin"]} wrapper={wrapper} />
    )

    expect(screen.getByTestId("custom-wrapper")).toBeInTheDocument()
  })
})
