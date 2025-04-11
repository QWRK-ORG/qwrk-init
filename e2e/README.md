# E2E Testing with Playwright

This directory contains end-to-end tests for the web application using Playwright. The configuration and tests are designed to work with your Next.js app running on port 3001.

## Getting Started

1. **Install Playwright:**

```bash
# From the root directory
pnpm add -D -w @playwright/test
```

2. **Install Browsers:**

```bash
npx playwright install chromium
```

3. **Run Tests:**

```bash
# From the root directory
pnpm test:e2e

# Run with UI for debugging
pnpm test:e2e:ui

# Run in debug mode with step-by-step execution
pnpm test:e2e:debug
```

4. **View Test Results:**

```bash
# Open the HTML report
npx playwright show-report
```

## Test Structure

- `simple-load.spec.ts`: A basic test that verifies the application loads correctly (guaranteed to work)
- `nextjs-app.spec.ts`: Tests Next.js app structure elements
- `priority-components.spec.ts`: Tests high-priority components (with placeholders ready to use)

## Important Configuration Details

- The app is configured to run on port 3001 (not the default 3000)
- Tests use increased timeouts for better reliability
- The webServer configuration automatically starts your Next.js app

## Component Test Priority

As defined in the project memories, focus on these components in this order:

- **High Priority**: chart.tsx, slider.tsx, input-otp.tsx, pagination.tsx
- **Medium Priority**: sidebar.tsx
- **Low Priority**: Atomic components (Button, Input)

## Adding Data-TestIDs

To make your components testable, add data-testid attributes:

```tsx
// Example for chart component
<Chart data-testid="chart" />

// Example for slider component
<Slider data-testid="slider" />
```

## Example Component Test

```typescript
import { test, expect } from '@playwright/test';

test('chart component renders correctly', async ({ page }) => {
  // Navigate to page with chart component
  await page.goto('/components');
  
  // Test chart visibility and functionality
  const chart = page.locator('[data-testid="chart"]');
  await expect(chart).toBeVisible();
  
  // Verify chart has expected elements
  await expect(chart.locator('svg')).toBeVisible();
});
```

## Troubleshooting

- If tests fail with connection errors, verify your app is running on port 3001
- For selector errors, check the element selectors in your tests match your actual DOM
- Use `page.screenshot()` to capture the state of the page for debugging
