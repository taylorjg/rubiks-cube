import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  base: "/rubiks-cube/",
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx"
      }
    }
  },
  plugins: [
    react({ include: /\.(jsx|js)$/ })
  ],
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js"
  }
})
