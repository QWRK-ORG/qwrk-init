/**
 * Create a mock for ResizeObserver
 * This is useful for components that use the ResizeObserver API
 */
export class MockResizeObserver {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
}

/**
 * Get a DOM element by attribute
 *
 * @param container - The container element
 * @param attribute - The attribute name
 * @param value - The attribute value
 * @returns The element with the specified attribute
 */
export function getByAttribute(
    container: HTMLElement,
    attribute: string,
    value: string
): HTMLElement | null {
    return container.querySelector(`[${attribute}="${value}"]`)
}
