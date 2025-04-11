"use client"

import { Home } from "lucide-react"
import { describe, expect, it, vi } from "vitest"
import { render, screen } from "../../../tests/test-utils"
import { NavLinkItem } from "./nav-link-item"

describe("NavLinkItem", () => {
  it("renders correctly with label", () => {
    render(<NavLinkItem href='/dashboard' label='Dashboard' />)

    const link = screen.getByRole("link", { name: "Dashboard" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/dashboard")
  })

  it("renders with icon", () => {
    render(
      <NavLinkItem
        href='/home'
        label='Home'
        icon={<Home data-testid='home-icon' />}
      />
    )

    expect(screen.getByTestId("home-icon")).toBeInTheDocument()
    expect(screen.getByText("Home")).toBeInTheDocument()
  })

  it("applies active styling when isActive is true", () => {
    render(<NavLinkItem href='/dashboard' label='Dashboard' isActive />)

    const link = screen.getByRole("link", { name: "Dashboard" })
    expect(link).toHaveClass("bg-muted")
    expect(link).toHaveClass("text-foreground")
    expect(link).toHaveAttribute("aria-current", "page")
  })

  it("applies inactive styling when isActive is false", () => {
    render(<NavLinkItem href='/dashboard' label='Dashboard' isActive={false} />)

    const link = screen.getByRole("link", { name: "Dashboard" })
    expect(link).toHaveClass("text-muted-foreground")
    expect(link).not.toHaveAttribute("aria-current")
  })

  it("calls onClick handler when clicked", async () => {
    const handleClick = vi.fn()
    const { user } = render(
      <NavLinkItem href='/dashboard' label='Dashboard' onClick={handleClick} />
    )

    const link = screen.getByRole("link", { name: "Dashboard" })
    await user.click(link)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("applies custom className", () => {
    render(
      <NavLinkItem
        href='/dashboard'
        label='Dashboard'
        className='custom-class'
      />
    )

    const link = screen.getByRole("link", { name: "Dashboard" })
    expect(link).toHaveClass("custom-class")
  })

  it("renders with tooltip", () => {
    render(
      <NavLinkItem
        href='/dashboard'
        label='Dashboard'
        tooltip='Navigate to dashboard'
      />
    )

    const link = screen.getByRole("link", { name: "Dashboard" })
    expect(link).toHaveAttribute("title", "Navigate to dashboard")
  })

  it("renders with custom aria-label", () => {
    render(
      <NavLinkItem
        href='/dashboard'
        label='Dashboard'
        ariaLabel='Go to dashboard'
      />
    )

    const link = screen.getByRole("link", { name: "Go to dashboard" })
    expect(link).toBeInTheDocument()
  })

  it("renders as external link when isExternal is true", () => {
    render(
      <NavLinkItem href='https://example.com' label='External' isExternal />
    )

    const link = screen.getByRole("link", { name: "External" })
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
    expect(screen.getByText("(opens in a new tab)")).toBeInTheDocument()
  })
})
