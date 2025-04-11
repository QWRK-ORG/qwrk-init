import { defineConfig, devices } from "@playwright/test"

/**
 * We'll use a better approach to handle the dynamic port allocation that Next.js uses.
 * Instead of starting the server inside the Playwright config, we'll:
n * 1. Rely on an already running server (started manually)
 * 2. Make tests work with any port by not setting baseURL and by using full URLs in tests
 */
export default defineConfig({
  testDir: "./e2e",
  outputDir: "./test-results",
  fullyParallel: false,
  forbidOnly: false,
  retries: 2,
  workers: 1,
  reporter: "html",
  timeout: 60000, // 60 seconds timeout per test
  use: {
    // We'll use full URLs in tests instead of baseURL
    trace: "on",
    screenshot: "on",
    video: "on-first-retry",
    // Increased timeouts for greater reliability
    navigationTimeout: 30000,
    actionTimeout: 15000
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]

  // We won't start the server from Playwright - it's better to run it separately
  // This way, we can handle dynamic ports easier
})
