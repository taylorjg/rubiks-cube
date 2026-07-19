import { describe, expect, it } from "vitest"
import { generateRandomScramble, getSolvedCube, makeMoves } from "./index.js"

const isUnchangedFromSolved = (cube, cubeSize) => {
  const solvedCube = getSolvedCube(cubeSize)
  return cube.every(piece => {
    const solvedPiece = solvedCube.find(entry => entry.id === piece.id)
    return (
      piece.x === solvedPiece.x &&
      piece.y === solvedPiece.y &&
      piece.z === solvedPiece.z
    )
  })
}

describe("generateRandomScramble", () => {
  it("generates the requested number of moves", () => {
    const moves = generateRandomScramble(2, 25)
    expect(moves).toHaveLength(25)
  })

  it("avoids consecutive opposite moves", () => {
    const moves = generateRandomScramble(2, 50)

    for (let index = 1; index < moves.length; index++) {
      expect(moves[index].id).not.toBe(moves[index - 1].oppositeMoveId)
    }
  })

  it("produces a non-solved cube for a long scramble", () => {
    const moves = generateRandomScramble(2, 25)
    const cube = makeMoves(moves, getSolvedCube(2))
    expect(isUnchangedFromSolved(cube, 2)).toBe(false)
  })
})
