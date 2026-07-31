import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Pure Node/JSDOM-free environment for now: everything under tests/ is
    // written to run without a DOM. Reach for `environment: "jsdom"` when the
    // first React component test lands.
    environment: "node",
    include: ["tests/**/*.test.{ts,tsx}"],
    // Keep runs snappy on CI + local — no snapshot bloat, no watch-mode UI.
    reporters: process.env.CI ? ["default"] : ["default"],
    passWithNoTests: false,
  },
  // Anime.js ships ESM only; Vitest handles it natively via Vite.
  // No aliases needed — tests import from the same paths the app does.
});
