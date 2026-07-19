import { describe, expect, it } from "vitest"
import { getSolvedCube, lookupMoveId, makeMoves } from "./index.js"
import {
  exportFacelets,
  formatSingmaster,
  isSolved,
  lookupFaceMoveId,
  moveToSingmaster,
  parseMoveToken,
  parseSingmaster
} from "./notation.js"

const applyAlg = algorithm =>
  makeMoves(parseSingmaster(algorithm), getSolvedCube(3))

describe("notation", () => {

  describe("exportFacelets", () => {
    it("returns 54 solved facelets for a solved cube", () => {
      const facelets = exportFacelets(getSolvedCube(3))
      expect(facelets).toHaveLength(54)
      expect(facelets).toBe("U".repeat(9) + "R".repeat(9) + "F".repeat(9) + "D".repeat(9) + "L".repeat(9) + "B".repeat(9))
    })
  })

  describe("isSolved", () => {
    it("returns true for a solved cube", () => {
      expect(isSolved(getSolvedCube(3))).toBe(true)
    })

    it("returns false after a scramble", () => {
      const cube = applyAlg("R U R' U'")
      expect(isSolved(cube)).toBe(false)
    })
  })

  describe("parseMoveToken", () => {
    it("maps face turns to expected move ids", () => {
      expect(parseMoveToken("R").id).toBe(6)
      expect(parseMoveToken("R'").id).toBe(8)
      expect(parseMoveToken("R2").id).toBe(7)
      expect(parseMoveToken("L").id).toBe(0)
      expect(parseMoveToken("U").id).toBe(15)
      expect(parseMoveToken("D").id).toBe(9)
      expect(parseMoveToken("F").id).toBe(24)
      expect(parseMoveToken("B").id).toBe(20)
    })
  })

  describe("moveToSingmaster", () => {
    it("round-trips move tokens", () => {
      for (const token of ["R", "R'", "R2", "U", "U'", "L", "L'", "F", "F2", "B", "B'", "D", "D2"]) {
        const move = parseMoveToken(token)
        expect(moveToSingmaster(move)).toBe(token)
      }
    })
  })

  describe("parseSingmaster", () => {
    it("parses a standard algorithm", () => {
      const moves = parseSingmaster("R U R' U'")
      expect(formatSingmaster(moves)).toBe("R U R' U'")
    })

    it("returns to solved with inverse algorithms", () => {
      const scramble = "R U R' U'"
      const cube = applyAlg(`${scramble} U R U' R'`)
      expect(isSolved(cube)).toBe(true)
    })

    it("handles half-turn notation without duplicating moves", () => {
      const moves = parseSingmaster("R2")
      expect(moves).toHaveLength(1)
      expect(moves[0].id).toBe(lookupFaceMoveId("R", 2))
    })
  })

  describe("known sequences", () => {
    it("changes facelets after R but returns to solved after four R turns", () => {
      const afterOne = applyAlg("R")
      expect(exportFacelets(afterOne)).not.toBe(exportFacelets(getSolvedCube(3)))

      const afterFour = applyAlg("R R R R")
      expect(isSolved(afterFour)).toBe(true)
    })

    it("returns to solved after a sune and its inverse", () => {
      const cube = applyAlg("R U R' U R U2 R'")
      expect(isSolved(cube)).toBe(false)
      const solvedAgain = makeMoves(parseSingmaster("R U2 R' U' R U' R'"), cube)
      expect(isSolved(solvedAgain)).toBe(true)
    })
  })
})
