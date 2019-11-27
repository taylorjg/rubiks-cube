import * as math from 'mathjs'
import * as CL from './coordsLists'
import * as R from './rotations'
import * as U from './utils'

export const TOP = 0
export const LEFT = 1
export const FRONT = 2
export const RIGHT = 3
export const BACK = 4
export const BOTTOM = 5

const coordsToColours = (x, y, z) =>
  [
    y === CL.VMAX ? 'U' : '-',
    x === CL.VMIN ? 'L' : '-',
    z === CL.VMAX ? 'F' : '-',
    x === CL.VMAX ? 'R' : '-',
    z === CL.VMIN ? 'B' : '-',
    y === CL.VMIN ? 'D' : '-'
  ].join('')

export const SOLVED_CUBE = CL.allCoordsList.map(([x, y, z], index) => ({
  id: index + 1,
  x, y, z,
  colours: coordsToColours(x, y, z),
  accTransform3: R.Identity
}))

const pieceHasCoords = (piece, coords) =>
  piece.x === coords[0] &&
  piece.y === coords[1] &&
  piece.z === coords[2]

export const getPieces = (cube, coordsList) =>
  coordsList.map(coords =>
    cube.find(piece => pieceHasCoords(piece, coords)))

const isPieceInCoordsList = (piece, coordsList) =>
  coordsList.findIndex(coords => pieceHasCoords(piece, coords)) >= 0

const rotatePiece = (piece, rotationMatrix3) => {
  const vector3 = math.matrix([piece.x, piece.y, piece.z])
  const rotatedVector3 = math.multiply(vector3, rotationMatrix3)
  return {
    ...piece,
    x: rotatedVector3.get([0]),
    y: rotatedVector3.get([1]),
    z: rotatedVector3.get([2]),
    accTransform3: math.multiply(piece.accTransform3, rotationMatrix3)
  }
}

const rotatePieces = (coordsList, rotationMatrix3) => cube =>
  cube.map(piece => isPieceInCoordsList(piece, coordsList)
    ? rotatePiece(piece, rotationMatrix3)
    : piece)

const makeKvp = (name, oppositeMoveName, rotationMatrix3, coordsList, numTurns) => {
  const key = name
  const value = {
    name,
    oppositeMoveName,
    makeMove: rotatePieces(coordsList, rotationMatrix3),
    rotationMatrix3,
    coordsList,
    numTurns
  }
  return [key, value]
}

// https://ruwix.com/the-rubiks-cube/notation/advanced/
const MOVE_NAMES_TO_MOVES = new Map([
  makeKvp('U\'', 'U', R.Y90, CL.topCoordsList, 1),
  makeKvp('U2', 'U2', R.Y180, CL.topCoordsList, 2),
  makeKvp('U', 'U\'', R.Y270, CL.topCoordsList, 1),
  makeKvp('E', 'E\'', R.Y90, CL.yawMiddleCoordsList, 1),
  makeKvp('E\'', 'E', R.Y270, CL.yawMiddleCoordsList, 1),
  makeKvp('D\'', 'D', R.Y90, CL.bottomCoordsList, 1),
  makeKvp('D2', 'D2', R.Y180, CL.bottomCoordsList, 2),
  makeKvp('D', 'D\'', R.Y270, CL.bottomCoordsList, 1),
  makeKvp('u\'', 'u', R.Y90, CL.topAndMiddleCoordsList, 1),
  makeKvp('u', 'u\'', R.Y270, CL.topAndMiddleCoordsList, 1),
  makeKvp('d', 'd\'', R.Y90, CL.bottomAndMiddleCoordsList, 1),
  makeKvp('d\'', 'd', R.Y270, CL.bottomAndMiddleCoordsList, 1),
  makeKvp('Y\'', 'Y', R.Y90, CL.allCoordsList, 1),
  makeKvp('Y', 'Y\'', R.Y270, CL.allCoordsList, 1),

  makeKvp('L', 'L\'', R.X90, CL.leftCoordsList, 1),
  makeKvp('L2', 'L2', R.X180, CL.leftCoordsList, 2),
  makeKvp('L\'', 'L', R.X270, CL.leftCoordsList, 1),
  makeKvp('M', 'M\'', R.X90, CL.pitchMiddleCoordsList, 1),
  makeKvp('M\'', 'M', R.X270, CL.pitchMiddleCoordsList, 1),
  makeKvp('R\'', 'R', R.X90, CL.rightCoordsList, 1),
  makeKvp('R2', 'R2', R.X180, CL.rightCoordsList, 2),
  makeKvp('R', 'R\'', R.X270, CL.rightCoordsList, 1),
  makeKvp('l', 'l\'', R.X90, CL.leftAndMiddleCoordsList, 1),
  makeKvp('l\'', 'l', R.X270, CL.leftAndMiddleCoordsList, 1),
  makeKvp('r\'', 'r', R.X90, CL.rightAndMiddleCoordsList, 1),
  makeKvp('r', 'r\'', R.X270, CL.rightAndMiddleCoordsList, 1),
  makeKvp('X\'', 'X', R.X90, CL.allCoordsList, 1),
  makeKvp('X', 'X\'', R.X270, CL.allCoordsList, 1),

  makeKvp('F\'', 'F', R.Z90, CL.frontCoordsList, 1),
  makeKvp('F2', 'F2', R.Z180, CL.frontCoordsList, 2),
  makeKvp('F', 'F\'', R.Z270, CL.frontCoordsList, 1),
  makeKvp('S\'', 'S', R.Z90, CL.rollMiddleCoordsList, 1),
  makeKvp('S', 'S\'', R.Z270, CL.rollMiddleCoordsList, 1),
  makeKvp('B', 'B\'', R.Z90, CL.backCoordsList, 1),
  makeKvp('B2', 'B2', R.Z180, CL.backCoordsList, 2),
  makeKvp('B\'', 'B', R.Z270, CL.backCoordsList, 1),
  makeKvp('f\'', 'f', R.Z90, CL.frontAndMiddleCoordsList, 1),
  makeKvp('f', 'f\'', R.Z270, CL.frontAndMiddleCoordsList, 1),
  makeKvp('b', 'b\'', R.Z90, CL.backAndMiddleCoordsList, 1),
  makeKvp('b\'', 'b', R.Z270, CL.backAndMiddleCoordsList, 1),
  makeKvp('Z\'', 'Z', R.Z90, CL.allCoordsList, 1),
  makeKvp('Z', 'Z\'', R.Z270, CL.allCoordsList, 1)
])

const MOVES = Array.from(MOVE_NAMES_TO_MOVES.values())

export const lookupMoveName = moveName => MOVE_NAMES_TO_MOVES.get(moveName)

export const getRandomMove = () => {
  const randomIndex = Math.floor(Math.random() * MOVES.length)
  return MOVES[randomIndex]
}

export const removeRedundantMoves = moves => {
  for (; ;) {
    let removedSomething = false
    const indexes = U.range(moves.length)
    for (const index of indexes.slice(1)) {
      const move = moves[index]
      const previousMove = moves[index - 1]
      if (move.name === previousMove.oppositeMoveName) {
        moves.splice(index, 1)
        removedSomething = true
        break
      }
    }
    if (!removedSomething) break
  }
}

export const makeMoves = (moves, initialCube = SOLVED_CUBE) =>
  moves.reduce((cube, move) => move.makeMove(cube), initialCube)
