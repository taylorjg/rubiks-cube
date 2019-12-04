import * as math from 'mathjs'
import * as CL from './coordsLists'
import * as R from './rotations'
import * as U from './utils'

const coordsToFaces = (vmin, vmax, x, y, z) => ({
  up: y === vmax ? 'U' : '-',
  down: y === vmin ? 'D' : '-',
  left: x === vmin ? 'L' : '-',
  right: x === vmax ? 'R' : '-',
  front: z === vmax ? 'F' : '-',
  back: z === vmin ? 'B' : '-'
})

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

const makeMoveIdsToMoves = cubeSize => {
  const { values } = CL.getCubeDimensions(cubeSize)
  const allCoordsList = CL.makeAllCoordsList(cubeSize)
  const slices = [
    ...values.map(xSlice => [xRotations, CL.pitchSliceCoordsList(allCoordsList, xSlice)]),
    ...values.map(ySlice => [yRotations, CL.yawSliceCoordsList(allCoordsList, ySlice)]),
    ...values.map(zSlice => [zRotations, CL.rollSliceCoordsList(allCoordsList, zSlice)])
  ]
  const nestedKvps = slices.map((slice, index) => [...makeKvpsForSlice(index, ...slice)])
  return new Map(U.flatten(nestedKvps))
}

const makeSolvedCube = cubeSize => {
  const { vmin, vmax } = CL.getCubeDimensions(cubeSize)
  const allCoordsList = CL.makeAllCoordsList(cubeSize)
  return allCoordsList.map(([x, y, z], index) => ({
    id: index,
    x, y, z,
    faces: coordsToFaces(vmin, vmax, x, y, z),
    accTransform3: R.Identity
  }))
}

const makePerCubeSizeDataEntry = cubeSize => {
  const moveIdsToMoves = makeMoveIdsToMoves(cubeSize)
  const moves = Array.from(moveIdsToMoves.values())
  const solvedCube = makeSolvedCube(cubeSize)
  return [cubeSize, { moveIdsToMoves, moves, solvedCube }]
}

const PER_CUBE_SIZE_DATA = new Map([
  makePerCubeSizeDataEntry(2),
  makePerCubeSizeDataEntry(3),
  makePerCubeSizeDataEntry(4),
  makePerCubeSizeDataEntry(5)
])

export const getSolvedCube = cubeSize => {
  const perCubeSizeData = PER_CUBE_SIZE_DATA.get(cubeSize)
  return perCubeSizeData.solvedCube
}

export const lookupMoveId = (cubeSize, id) => {
  const perCubeSizeData = PER_CUBE_SIZE_DATA.get(cubeSize)
  return perCubeSizeData.moveIdsToMoves.get(id)
}

export const getRandomMove = cubeSize => {
  const perCubeSizeData = PER_CUBE_SIZE_DATA.get(cubeSize)
  const randomIndex = Math.floor(Math.random() * perCubeSizeData.moves.length)
  return perCubeSizeData.moves[randomIndex]
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

export const makeMoves = (moves, initialCube) =>
  moves.reduce((cube, move) => move.makeMove(cube), initialCube)
