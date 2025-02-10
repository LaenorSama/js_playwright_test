import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  reporter: [
    ["list"],
    ["allure-playwright", { resultsDir: "./out/allure-results", environmentInfo: { node_version: process.version, }, noTestPlan: true }, ],
            ],
  projects: [ { name: "chromium", use: {...devices["Desktop Chrome"], }, }, ],
});
