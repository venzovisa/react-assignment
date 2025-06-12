import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // use JSDOM for React DOM tests
    globals: true, // make vitest globals (describe, expect) available
    setupFiles: "src/setupTests.ts", // script to run before tests (see below)
  },
});
