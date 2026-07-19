import { formatSingmaster, parseSingmaster } from "./notation.js"

let rubikSolver = null
let initialized = false

const loadRubikSolver = async () => {
  if (!rubikSolver) {
    rubikSolver = await import("rubik-solver")
  }
  return rubikSolver
}

const toSolverToken = token => {
  switch (token) {
    case "R": return "R'"
    case "R'": return "R"
    case "U": return "U'"
    case "U'": return "U"
    default: return token
  }
}

const fromSolverToken = token => {
  switch (token) {
    case "R": return "R'"
    case "R'": return "R"
    case "U": return "U'"
    case "U'": return "U"
    default: return token
  }
}

const toSolverAlgorithm = moves =>
  formatSingmaster(moves)
    .split(" ")
    .map(toSolverToken)
    .join(" ")

const fromSolverAlgorithm = algorithm =>
  algorithm
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(fromSolverToken)
    .join(" ")

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
  const cubeState = new Cube().move(toSolverAlgorithm(scrambleMoves))
  const solution = solve(cubeState)
  if (!solution) {
    throw new Error("Solver returned no solution")
  }
  return parseSingmaster(fromSolverAlgorithm(solution))
}
