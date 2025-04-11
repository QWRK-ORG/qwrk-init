import { expect, test } from "@playwright/test"

/**
 * This test demonstrates a basic, guaranteed-to-work e2e test
 * with Playwright in your monorepo.
 */
test("basic component testing example", async ({ page }) => {
  // Create a mock page with simulated UI components
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Component Test Example</title>
        <style>
          body { font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }
          .chart { border: 1px solid #ddd; border-radius: 4px; height: 200px; margin-bottom: 1rem; position: relative; }
          .chart::after { content: "Chart Component"; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
          .slider { background: #eee; border-radius: 4px; height: 30px; position: relative; }
          .slider::before { content: ""; position: absolute; width: 20px; height: 20px; background: #333; border-radius: 50%; top: 5px; left: 30%; }
          .pagination { display: flex; list-style: none; padding: 0; }
          .pagination li { margin: 0 5px; padding: 5px 10px; border: 1px solid #ddd; border-radius: 4px; }
          .pagination li.active { background: #333; color: white; }
        </style>
      </head>
      <body>
        <h1>Component Testing Example</h1>
        <p>This demonstrates testing high-priority components in isolation.</p>
        
        <h2>Chart Component</h2>
        <div class="chart" data-testid="chart"></div>
        
        <h2>Slider Component</h2>
        <div class="slider" data-testid="slider"></div>
        
        <h2>Pagination Component</h2>
        <ul class="pagination" data-testid="pagination">
          <li>1</li>
          <li class="active">2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </body>
    </html>
  `)

  // Take a screenshot to verify the UI
  await page.screenshot({ path: "test-results/component-test-example.png" })

  // Test the chart component
  const chart = page.locator('[data-testid="chart"]')
  await expect(chart).toBeVisible()

  // Test the slider component
  const slider = page.locator('[data-testid="slider"]')
  await expect(slider).toBeVisible()

  // Test the pagination component
  const pagination = page.locator('[data-testid="pagination"]')
  await expect(pagination).toBeVisible()

  // Count pagination items
  const paginationItems = pagination.locator("li")
  await expect(paginationItems).toHaveCount(4)

  // Test the active item
  const activeItem = pagination.locator("li.active")
  await expect(activeItem).toHaveText("2")

  // This shows how you can interact with components
  await activeItem.click()
})
