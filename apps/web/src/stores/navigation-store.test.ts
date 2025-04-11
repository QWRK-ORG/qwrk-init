import { beforeEach, describe, expect, it } from "vitest"
import { useNavigationStore } from "./navigation-store"

describe("useNavigationStore", () => {
  beforeEach(() => {
    // Reset the store before each test
    useNavigationStore.setState({
      breadcrumbs: [],
      setBreadcrumbs: (items) =>
        useNavigationStore.setState({ breadcrumbs: items }),
      activeNavPath: null,
      setActiveNavPath: (path) =>
        useNavigationStore.setState({ activeNavPath: path }),
      isMobileNavOpen: false,
      openMobileNav: () =>
        useNavigationStore.setState({ isMobileNavOpen: true }),
      closeMobileNav: () =>
        useNavigationStore.setState({ isMobileNavOpen: false }),
      toggleMobileNav: () =>
        useNavigationStore.setState((state) => ({
          isMobileNavOpen: !state.isMobileNavOpen
        }))
    })
  })

  it("initializes with default values", () => {
    const state = useNavigationStore.getState()

    expect(state.breadcrumbs).toEqual([])
    expect(state.activeNavPath).toBeNull()
    expect(state.isMobileNavOpen).toBe(false)
  })

  it("updates breadcrumbs correctly", () => {
    const breadcrumbs = [
      { href: "/", label: "Home" },
      { href: "/products", label: "Products" },
      { label: "Product Details" }
    ]

    useNavigationStore.getState().setBreadcrumbs(breadcrumbs)

    expect(useNavigationStore.getState().breadcrumbs).toEqual(breadcrumbs)
  })

  it("updates activeNavPath correctly", () => {
    useNavigationStore.getState().setActiveNavPath("/dashboard")

    expect(useNavigationStore.getState().activeNavPath).toBe("/dashboard")
  })

  it("opens mobile nav correctly", () => {
    useNavigationStore.getState().openMobileNav()

    expect(useNavigationStore.getState().isMobileNavOpen).toBe(true)
  })

  it("closes mobile nav correctly", () => {
    // First open the nav
    useNavigationStore.getState().openMobileNav()
    expect(useNavigationStore.getState().isMobileNavOpen).toBe(true)

    // Then close it
    useNavigationStore.getState().closeMobileNav()
    expect(useNavigationStore.getState().isMobileNavOpen).toBe(false)
  })

  it("toggles mobile nav correctly", () => {
    // Initially closed
    expect(useNavigationStore.getState().isMobileNavOpen).toBe(false)

    // Toggle to open
    useNavigationStore.getState().toggleMobileNav()
    expect(useNavigationStore.getState().isMobileNavOpen).toBe(true)

    // Toggle to close
    useNavigationStore.getState().toggleMobileNav()
    expect(useNavigationStore.getState().isMobileNavOpen).toBe(false)
  })
})
