import { formatSingmaster, parseSingmaster } from "./notation.js"

const SOLVED_FACELETS = "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB"

let Cube = null
let initialized = false

const loadCube = async () => {
  if (!Cube) {
    const module = await import("./cubejs-shim.js")
    Cube = module.default
  }
  return Cube
}

const toCubejsToken = token => {
  switch (token) {
    case "R": return "R'"
    case "R'": return "R"
    case "U": return "U'"
    case "U'": return "U"
    default: return token
  }
}

const fromCubejsToken = token => {
  switch (token) {
    case "R": return "R'"
    case "R'": return "R"
    case "U": return "U'"
    case "U'": return "U"
    default: return token
  }
}

const toCubejsAlgorithm = moves =>
  formatSingmaster(moves)
    .split(" ")
    .map(toCubejsToken)
    .join(" ")

const fromCubejsAlgorithm = algorithm =>
  algorithm
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(fromCubejsToken)
    .join(" ")

export const initializeSolver = async () => {
  if (initialized) {
    return
  }
  const CubeClass = await loadCube()
  CubeClass.initSolver()
  initialized = true
}

export const solve3x3 = async scrambleMoves => {
  const CubeClass = await loadCube()
  await initializeSolver()
  const cubeState = CubeClass.fromString(SOLVED_FACELETS)
  cubeState.move(toCubejsAlgorithm(scrambleMoves))
  const solution = cubeState.solve()
  return parseSingmaster(fromCubejsAlgorithm(solution))
}
