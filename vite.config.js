import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  base: "/rubiks-cube/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js"
  }
})
