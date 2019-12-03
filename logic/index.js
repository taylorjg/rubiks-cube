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

const makeKvp = (id, oppositeMoveId, rotationMatrix3, coordsList, numTurns) => {
  const key = id
  const value = {
    id,
    oppositeMoveId,
    makeMove: rotatePieces(coordsList, rotationMatrix3),
    rotationMatrix3,
    coordsList,
    numTurns
  }
  return [key, value]
}

const makeKvpsForSlice = (baseId, rotationMatrices3, coordsList) => {
  const move90Id = baseId * 3
  const move180Id = move90Id + 1
  const move270Id = move90Id + 2
  const move90 = makeKvp(move90Id, move270Id, rotationMatrices3[0], coordsList, 1)
  const move180 = makeKvp(move180Id, move180Id, rotationMatrices3[1], coordsList, 2)
  const move270 = makeKvp(move270Id, move90Id, rotationMatrices3[2], coordsList, 1)
  return [move90, move180, move270]
}

const xRotations = [R.X90, R.X180, R.X270]
const yRotations = [R.Y90, R.Y180, R.Y270]
const zRotations = [R.Z90, R.Z180, R.Z270]

const slices = [
  ...CL.VALUES.map(xSlice => [xRotations, CL.pitchSliceCoordsList(xSlice)]),
  ...CL.VALUES.map(ySlice => [yRotations, CL.yawSliceCoordsList(ySlice)]),
  ...CL.VALUES.map(zSlice => [zRotations, CL.rollSliceCoordsList(zSlice)])
]

const nestedKvps = slices.map((slice, index) => [...makeKvpsForSlice(index, ...slice)])
const MOVE_IDS_TO_MOVES = new Map(U.flatten(nestedKvps))

const MOVES = Array.from(MOVE_IDS_TO_MOVES.values())

export const lookupMoveId = id => MOVE_IDS_TO_MOVES.get(id)

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
      if (move.id === previousMove.oppositeMoveId) {
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
