import { describe, expect, it } from "vitest"
import { getSolvedCube, makeMoves } from "./index.js"
import { generateFaceTurnScramble, isSolved } from "./notation.js"
import { solve3x3 } from "./solver.js"

describe("solve3x3", () => {
  it(
    "solves a scrambled 3x3 cube",
    async () => {
      const scramble = generateFaceTurnScramble(15)
      const scrambled = makeMoves(scramble, getSolvedCube(3))
      expect(isSolved(scrambled)).toBe(false)

      const solution = await solve3x3(scramble)
      const solved = makeMoves(solution, scrambled)
      expect(isSolved(solved)).toBe(true)
    },
    15_000
  )
})
