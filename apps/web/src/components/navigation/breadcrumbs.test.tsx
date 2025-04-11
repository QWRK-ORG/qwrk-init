import "@testing-library/jest-dom"
import { Home } from "lucide-react"
import { describe, expect, it } from "vitest"
import { render, screen } from "../../../tests/test-utils"
import { BreadcrumbItem, Breadcrumbs } from "./breadcrumbs"

describe("BreadcrumbItem", () => {
  it("renders correctly with text content", () => {
    render(<BreadcrumbItem>Home</BreadcrumbItem>)
    expect(screen.getByText("Home")).toBeInTheDocument()
  })

  it("renders as a link when href is provided", () => {
    render(<BreadcrumbItem href='/home'>Home</BreadcrumbItem>)
    const link = screen.getByRole("link", { name: "Home" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/home")
  })

  it("renders as a span when no href is provided", () => {
    render(<BreadcrumbItem>Home</BreadcrumbItem>)
    const element = screen.getByText("Home")
    expect(element.tagName).toBe("SPAN")
  })

  it("applies current page styling when isCurrent is true", () => {
    render(<BreadcrumbItem isCurrent>Current Page</BreadcrumbItem>)
    const element = screen.getByText("Current Page")
    expect(element).toHaveClass("font-medium")
    expect(element).toHaveClass("text-foreground")
    expect(element).toHaveAttribute("aria-current", "page")
  })

  it("applies custom className", () => {
    render(<BreadcrumbItem className='custom-class'>Home</BreadcrumbItem>)
    expect(screen.getByText("Home")).toHaveClass("custom-class")
  })
})

describe("Breadcrumbs", () => {
  const items = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { label: "Product Details" }
  ]

  it("renders all breadcrumb items", () => {
    render(<Breadcrumbs items={items} />)

    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Products")).toBeInTheDocument()
    expect(screen.getByText("Product Details")).toBeInTheDocument()
  })

  it("renders the last item as current page", () => {
    render(<Breadcrumbs items={items} />)

    const homeLink = screen.getByRole("link", { name: "Home" })
    const productsLink = screen.getByRole("link", { name: "Products" })
    const detailsText = screen.getByText("Product Details")

    expect(homeLink).toHaveAttribute("href", "/")
    expect(productsLink).toHaveAttribute("href", "/products")
    expect(detailsText).toHaveAttribute("aria-current", "page")
  })

  it("renders custom separator", () => {
    render(
      <Breadcrumbs
        items={items}
        separator={<Home data-testid='custom-separator' />}
      />
    )

    // There should be 2 separators for 3 items
    expect(screen.getAllByTestId("custom-separator")).toHaveLength(2)
  })

  it("applies custom className", () => {
    render(<Breadcrumbs items={items} className='custom-class' />)

    const nav = screen.getByRole("navigation")
    expect(nav).toHaveClass("custom-class")
  })

  it("has correct accessibility attributes", () => {
    render(<Breadcrumbs items={items} />)

    const nav = screen.getByRole("navigation")
    expect(nav).toHaveAttribute("aria-label", "Breadcrumb")
  })
})
