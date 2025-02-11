import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  reporter: [
    ["list"],
    ["allure-playwright", { resultsDir: "./out/allure-results" } ]
});
