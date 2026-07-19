import { exportFacelets, parseSingmaster } from "./notation.js"

let cubeModule = null
let initialized = false

const loadCube = async () => {
  if (!cubeModule) {
    cubeModule = await import("cubejs")
  }
  return cubeModule.default || cubeModule
}

export const initializeSolver = async () => {
  if (initialized) {
    return
  }
  const Cube = await loadCube()
  Cube.initSolver()
  initialized = true
}

export const solve3x3 = async cube => {
  const Cube = await loadCube()
  await initializeSolver()
  const facelets = exportFacelets(cube)
  const cubeState = Cube.fromString(facelets)
  const solution = cubeState.solve()
  return parseSingmaster(solution)
}
