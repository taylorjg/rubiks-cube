import fs from "node:fs"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const patchCubejsSolve = code => code
  .replace(
    "Cube = this.Cube || require('./cube')",
    "Cube = globalThis.Cube || require('./cube')"
  )
  .replace(
    /Cube = this\.Cube \|\| require_cube\(\)/g,
    "Cube = globalThis.Cube || require_cube()"
  )
  .replace(/\}\)\.call\(this\);/, "}).call(globalThis);")
  .replace(/\}\)\.call\(void 0\);/, "}).call(globalThis);")

const cubejsSolveFix = () => ({
  name: "cubejs-solve-fix",
  enforce: "pre",
  load(id) {
    if (id.endsWith("cubejs/lib/solve.js")) {
      return patchCubejsSolve(fs.readFileSync(id, "utf-8"))
    }
  },
  transform(code, id) {
    if (id.includes("cubejs/lib/solve.js")) {
      return {
        code: patchCubejsSolve(code),
        map: null
      }
    }
  }
})

export default defineConfig({
  base: "/rubiks-cube/",
  plugins: [react(), cubejsSolveFix()],
  optimizeDeps: {
    include: ["cubejs/lib/cube.js"],
    exclude: ["cubejs/lib/solve.js"]
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js"
  }
})
