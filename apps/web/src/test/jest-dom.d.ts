import "@testing-library/jest-dom"

declare global {
    namespace Vi {
        interface Assertion {
            toBeInTheDocument(): Assertion
            toHaveClass(className: string): Assertion
            toHaveAttribute(attr: string, value?: string): Assertion
        }
    }

    namespace Chai {
        interface Assertion {
            toBeInTheDocument(): Assertion
            toHaveClass(className: string): Assertion
            toHaveAttribute(attr: string, value?: string): Assertion
        }
    }
}
