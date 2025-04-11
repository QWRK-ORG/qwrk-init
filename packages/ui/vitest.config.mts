import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { defineProject } from "vitest/config"

export default defineProject({
    //@ts-ignore
    plugins: [react()],
    resolve: {
        alias: {
            "@workspace/ui": resolve(__dirname, "./src")
        }
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./src/test/setup.ts"],
        testTimeout: 10000,
        browser: {
            enabled: false,
            headless: true
        }
    }
})
