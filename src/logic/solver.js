import { formatSingmaster, parseSingmaster } from "./notation.js"

let rubikSolver = null
let initialized = false

const loadRubikSolver = async () => {
  if (!rubikSolver) {
    rubikSolver = await import("rubik-solver")
  }
  return rubikSolver
}

export const initializeSolver = async () => {
  if (initialized) {
    return
  }
  const { initSolver } = await loadRubikSolver()
  initSolver()
  initialized = true
}

export const solve3x3 = async scrambleMoves => {
  const { Cube, initSolver, solve } = await loadRubikSolver()
  if (!initialized) {
    initSolver()
    initialized = true
  }
  const cubeState = new Cube().move(formatSingmaster(scrambleMoves))
  const solution = solve(cubeState)
  if (!solution) {
    throw new Error("Solver returned no solution")
  }
  return parseSingmaster(solution)
}
