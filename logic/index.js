import * as math from 'mathjs'
import * as CL from './coordsLists'
import * as R from './rotations'

export const TOP = 0
export const LEFT = 1
export const FRONT = 2
export const RIGHT = 3
export const BACK = 4
export const BOTTOM = 5

export const SOLVED_CUBE = [
  // top layer
  { id: 1, x: -1, y: 1, z: 1, colours: 'BRY---', accTransform3: R.Identity },
  { id: 2, x: 0, y: 1, z: 1, colours: 'B-Y---', accTransform3: R.Identity },
  { id: 3, x: 1, y: 1, z: 1, colours: 'B-YO--', accTransform3: R.Identity },
  { id: 4, x: -1, y: 1, z: 0, colours: 'BR----', accTransform3: R.Identity },
  { id: 5, x: 0, y: 1, z: 0, colours: 'B-----', accTransform3: R.Identity },
  { id: 6, x: 1, y: 1, z: 0, colours: 'B--O--', accTransform3: R.Identity },
  { id: 7, x: -1, y: 1, z: -1, colours: 'BR--W-', accTransform3: R.Identity },
  { id: 8, x: 0, y: 1, z: -1, colours: 'B---W-', accTransform3: R.Identity },
  { id: 9, x: 1, y: 1, z: -1, colours: 'B--OW-', accTransform3: R.Identity },

  // middle layer
  { id: 10, x: -1, y: 0, z: 1, colours: '-RY---', accTransform3: R.Identity },
  { id: 11, x: 0, y: 0, z: 1, colours: '--Y---', accTransform3: R.Identity },
  { id: 12, x: 1, y: 0, z: 1, colours: '--YO--', accTransform3: R.Identity },
  { id: 13, x: -1, y: 0, z: 0, colours: '-R----', accTransform3: R.Identity },
  // Note: there is no piece at the centre i.e. x: 0, y: 0, z: 0
  { id: 14, x: 1, y: 0, z: 0, colours: '---O--', accTransform3: R.Identity },
  { id: 15, x: -1, y: 0, z: -1, colours: '-R--W-', accTransform3: R.Identity },
  { id: 16, x: 0, y: 0, z: -1, colours: '----W-', accTransform3: R.Identity },
  { id: 17, x: 1, y: 0, z: -1, colours: '---OW-', accTransform3: R.Identity },

  // bottom layer
  { id: 18, x: -1, y: -1, z: 1, colours: '-RY--G', accTransform3: R.Identity },
  { id: 19, x: 0, y: -1, z: 1, colours: '--Y--G', accTransform3: R.Identity },
  { id: 20, x: 1, y: -1, z: 1, colours: '--YO-G', accTransform3: R.Identity },
  { id: 21, x: -1, y: -1, z: 0, colours: '-R---G', accTransform3: R.Identity },
  { id: 22, x: 0, y: -1, z: 0, colours: '-----G', accTransform3: R.Identity },
  { id: 23, x: 1, y: -1, z: 0, colours: '---O-G', accTransform3: R.Identity },
  { id: 24, x: -1, y: -1, z: -1, colours: '-R--WG', accTransform3: R.Identity },
  { id: 25, x: 0, y: -1, z: -1, colours: '----WG', accTransform3: R.Identity },
  { id: 26, x: 1, y: -1, z: -1, colours: '---OWG', accTransform3: R.Identity }
]

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

const makeMoveDataEntry = (rotationMatrix3, coordsList, numTurns, oppositeMove) => ({
  makeMove: rotatePieces(coordsList, rotationMatrix3),
  rotationMatrix3,
  coordsList,
  numTurns,
  oppositeMove
})

// https://ruwix.com/the-rubiks-cube/notation/advanced/
export const MOVE_DATA = new Map([
  ['U\'', makeMoveDataEntry(R.Y90, CL.topCoordsList, 1, 'U')],
  ['U2', makeMoveDataEntry(R.Y180, CL.topCoordsList, 2, 'U2')],
  ['U', makeMoveDataEntry(R.Y270, CL.topCoordsList, 1, 'U\'')],
  ['E', makeMoveDataEntry(R.Y90, CL.yawMiddleCoordsList, 1, 'E\'')],
  ['E\'', makeMoveDataEntry(R.Y270, CL.yawMiddleCoordsList, 1, 'E')],
  ['D\'', makeMoveDataEntry(R.Y90, CL.bottomCoordsList, 1, 'D')],
  ['D2', makeMoveDataEntry(R.Y180, CL.bottomCoordsList, 2, 'D2')],
  ['D', makeMoveDataEntry(R.Y270, CL.bottomCoordsList, 1, 'D\'')],
  ['u\'', makeMoveDataEntry(R.Y90, CL.topAndMiddleCoordsList, 1, 'u')],
  ['u', makeMoveDataEntry(R.Y270, CL.topAndMiddleCoordsList, 1, 'u\'')],
  ['d', makeMoveDataEntry(R.Y90, CL.bottomAndMiddleCoordsList, 1, 'd\'')],
  ['d\'', makeMoveDataEntry(R.Y270, CL.bottomAndMiddleCoordsList, 1, 'd')],
  ['Y\'', makeMoveDataEntry(R.Y90, CL.allCoordsList, 1, 'Y')],
  ['Y', makeMoveDataEntry(R.Y270, CL.allCoordsList, 1, 'Y\'')],

  ['L', makeMoveDataEntry(R.X90, CL.leftCoordsList, 1, 'L\'')],
  ['L2', makeMoveDataEntry(R.X180, CL.leftCoordsList, 2, 'L2')],
  ['L\'', makeMoveDataEntry(R.X270, CL.leftCoordsList, 1, 'L')],
  ['M', makeMoveDataEntry(R.X90, CL.pitchMiddleCoordsList, 1, 'M\'')],
  ['M\'', makeMoveDataEntry(R.X270, CL.pitchMiddleCoordsList, 1, 'M')],
  ['R\'', makeMoveDataEntry(R.X90, CL.rightCoordsList, 1, 'R')],
  ['R2', makeMoveDataEntry(R.X180, CL.rightCoordsList, 2, 'R2')],
  ['R', makeMoveDataEntry(R.X270, CL.rightCoordsList, 1, 'R\'')],
  ['l', makeMoveDataEntry(R.X90, CL.leftAndMiddleCoordsList, 1, 'l\'')],
  ['l\'', makeMoveDataEntry(R.X270, CL.leftAndMiddleCoordsList, 1, 'l')],
  ['r\'', makeMoveDataEntry(R.X90, CL.rightAndMiddleCoordsList, 1, 'r')],
  ['r', makeMoveDataEntry(R.X270, CL.rightAndMiddleCoordsList, 1, 'r\'')],
  ['X\'', makeMoveDataEntry(R.X90, CL.allCoordsList, 1, 'X')],
  ['X', makeMoveDataEntry(R.X270, CL.allCoordsList, 1, 'X\'')],

  ['F\'', makeMoveDataEntry(R.Z90, CL.frontCoordsList, 1, 'F')],
  ['F2', makeMoveDataEntry(R.Z180, CL.frontCoordsList, 2, 'F2')],
  ['F', makeMoveDataEntry(R.Z270, CL.frontCoordsList, 1, 'F\'')],
  ['S\'', makeMoveDataEntry(R.Z90, CL.rollMiddleCoordsList, 1, 'S')],
  ['S', makeMoveDataEntry(R.Z270, CL.rollMiddleCoordsList, 1, 'S\'')],
  ['B', makeMoveDataEntry(R.Z90, CL.backCoordsList, 1, 'B\'')],
  ['B2', makeMoveDataEntry(R.Z180, CL.backCoordsList, 2, 'B2')],
  ['B\'', makeMoveDataEntry(R.Z270, CL.backCoordsList, 1, 'B')],
  ['f\'', makeMoveDataEntry(R.Z90, CL.frontAndMiddleCoordsList, 1, 'f')],
  ['f', makeMoveDataEntry(R.Z270, CL.frontAndMiddleCoordsList, 1, 'f\'')],
  ['b', makeMoveDataEntry(R.Z90, CL.backAndMiddleCoordsList, 1, 'b\'')],
  ['b\'', makeMoveDataEntry(R.Z270, CL.backAndMiddleCoordsList, 1, 'b')],
  ['Z\'', makeMoveDataEntry(R.Z90, CL.allCoordsList, 1, 'Z')],
  ['Z', makeMoveDataEntry(R.Z270, CL.allCoordsList, 1, 'Z\'')]
])

const MOVE_NAMES = Array.from(MOVE_DATA.keys())

export const randomMove = () => {
  const randomIndex = Math.floor(Math.random() * MOVE_NAMES.length)
  return MOVE_NAMES[randomIndex]
}

export const removeRedundantMoves = moves => {
  for (; ;) {
    let removedSomething = false
    const indexes = Array.from(Array(moves.length).keys())
    for (const index of indexes) {
      if (index === 0) continue
      const move = moves[index]
      const previousMove = moves[index - 1]
      if (move === MOVE_DATA.get(previousMove).oppositeMove) {
        moves.splice(index, 1)
        removedSomething = true
        break
      }
    }
    if (!removedSomething) break
  }
}
