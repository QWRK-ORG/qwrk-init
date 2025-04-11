import { Button } from "@workspace/ui/components/button"
import { expect, it } from "vitest"
import { render, screen } from "../../../tests/test-utils"
import { PageHeader } from "./page-header"

it("renders title correctly", () => {
  render(<PageHeader title='Dashboard' />)

  expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument()
})

it("renders description when provided", () => {
  render(
    <PageHeader
      title='Dashboard'
      description='View your analytics and reports'
    />
  )

  expect(
    screen.getByText("View your analytics and reports")
  ).toBeInTheDocument()
})

it("does not render description when not provided", () => {
  render(<PageHeader title='Dashboard' />)

  const heading = screen.getByRole("heading", { name: "Dashboard" })
  const parent = heading.parentElement

  // Check that there's no paragraph element as a sibling to the heading
  expect(parent?.querySelector("p")).toBeNull()
})

it("renders actions when provided", () => {
  render(
    <PageHeader
      title='Dashboard'
      actions={<Button data-testid='action-button'>Action</Button>}
    />
  )

  expect(screen.getByTestId("action-button")).toBeInTheDocument()
})

it("applies custom className", () => {
  render(<PageHeader title='Dashboard' className='custom-class' />)

  // The component's root div should have the custom class
  const rootDiv = screen.getByText("Dashboard").closest("div")
    ?.parentElement?.parentElement
  expect(rootDiv).toHaveClass("custom-class")
})
