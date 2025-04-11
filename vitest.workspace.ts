import { defineWorkspace } from "vitest/config"

export default defineWorkspace([
    "packages/*/vitest.config.{ts,js,mts,mjs}",
    "apps/*/vitest.config.{ts,js,mts,mjs}"
])
