import * as math from 'mathjs'
import * as CL from './coordsLists'
import * as R from './rotations'

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

const transformPiece = (piece, rotationMatrix3) => {
  const vector = math.matrix([piece.x, piece.y, piece.z])
  const rotatedVector = math.multiply(vector, rotationMatrix3)
  return {
    ...piece,
    x: rotatedVector.get([0]),
    y: rotatedVector.get([1]),
    z: rotatedVector.get([2]),
    accTransform3: math.multiply(piece.accTransform3, rotationMatrix3)
  }
}

const transformPieces = (coordsList, rotationMatrix3) => cube =>
  cube.map(piece => isPieceInCoordsList(piece, coordsList)
    ? transformPiece(piece, rotationMatrix3)
    : piece)

export const yawTop90 = transformPieces(CL.topCoordsList, R.Y90)
export const yawTop180 = transformPieces(CL.topCoordsList, R.Y180)
export const yawTop270 = transformPieces(CL.topCoordsList, R.Y270)
export const yawMiddle90 = transformPieces(CL.yawMiddleCoordsList, R.Y90)
export const yawMiddle270 = transformPieces(CL.yawMiddleCoordsList, R.Y270)
export const yawBottom90 = transformPieces(CL.bottomCoordsList, R.Y90)
export const yawBottom180 = transformPieces(CL.bottomCoordsList, R.Y180)
export const yawBottom270 = transformPieces(CL.bottomCoordsList, R.Y270)
export const yawTopAndMiddle90 = transformPieces(CL.topAndMiddleCoordsList, R.Y90)
export const yawTopAndMiddle270 = transformPieces(CL.topAndMiddleCoordsList, R.Y270)
export const yawBottomAndMiddle90 = transformPieces(CL.bottomAndMiddleCoordsList, R.Y90)
export const yawBottomAndMiddle270 = transformPieces(CL.bottomAndMiddleCoordsList, R.Y270)
export const yawAll90 = transformPieces(CL.allCoordsList, R.Y90)
export const yawAll270 = transformPieces(CL.allCoordsList, R.Y270)

export const pitchLeft90 = transformPieces(CL.leftCoordsList, R.X90)
export const pitchLeft180 = transformPieces(CL.leftCoordsList, R.X180)
export const pitchLeft270 = transformPieces(CL.leftCoordsList, R.X270)
export const pitchMiddle90 = transformPieces(CL.pitchMiddleCoordsList, R.X90)
export const pitchMiddle270 = transformPieces(CL.pitchMiddleCoordsList, R.X270)
export const pitchRight90 = transformPieces(CL.rightCoordsList, R.X90)
export const pitchRight180 = transformPieces(CL.rightCoordsList, R.X180)
export const pitchRight270 = transformPieces(CL.rightCoordsList, R.X270)
export const pitchLeftAndMiddle90 = transformPieces(CL.leftAndMiddleCoordsList, R.X90)
export const pitchLeftAndMiddle270 = transformPieces(CL.leftAndMiddleCoordsList, R.X270)
export const pitchRightAndMiddle90 = transformPieces(CL.rightAndMiddleCoordsList, R.X90)
export const pitchRightAndMiddle270 = transformPieces(CL.rightAndMiddleCoordsList, R.X270)
export const pitchAll90 = transformPieces(CL.allCoordsList, R.X90)
export const pitchAll270 = transformPieces(CL.allCoordsList, R.X270)

export const rollFront90 = transformPieces(CL.frontCoordsList, R.Z90)
export const rollFront180 = transformPieces(CL.frontCoordsList, R.Z180)
export const rollFront270 = transformPieces(CL.frontCoordsList, R.Z270)
export const rollMiddle90 = transformPieces(CL.rollMiddleCoordsList, R.Z90)
export const rollMiddle270 = transformPieces(CL.rollMiddleCoordsList, R.Z270)
export const rollBack90 = transformPieces(CL.backCoordsList, R.Z90)
export const rollBack180 = transformPieces(CL.backCoordsList, R.Z180)
export const rollBack270 = transformPieces(CL.backCoordsList, R.Z270)
export const rollFrontAndMiddle90 = transformPieces(CL.frontAndMiddleCoordsList, R.Z90)
export const rollFrontAndMiddle270 = transformPieces(CL.frontAndMiddleCoordsList, R.Z270)
export const rollBackAndMiddle90 = transformPieces(CL.backAndMiddleCoordsList, R.Z90)
export const rollBackAndMiddle270 = transformPieces(CL.backAndMiddleCoordsList, R.Z270)
export const rollAll90 = transformPieces(CL.allCoordsList, R.Z90)
export const rollAll270 = transformPieces(CL.allCoordsList, R.Z270)

// https://ruwix.com/the-rubiks-cube/notation/advanced/
export const MOVES = [
  yawTop90, // U'
  yawTop180, // U2
  yawTop270, // U
  yawMiddle90, // E
  yawMiddle270, // E'
  yawBottom90, // D'
  yawBottom180, // D2
  yawBottom270, // D
  yawTopAndMiddle90, // u'
  yawTopAndMiddle270, // u
  yawBottomAndMiddle90, // d
  yawBottomAndMiddle270, // d'
  yawAll90, // Y'
  yawAll270, // Y

  pitchLeft90, // L
  pitchLeft180, // L2
  pitchLeft270, // L'
  pitchMiddle90, // M
  pitchMiddle270, // M'
  pitchRight90, // R'
  pitchRight180, // R2
  pitchRight270, // R
  pitchLeftAndMiddle90, // l
  pitchLeftAndMiddle270, // l'
  pitchRightAndMiddle90, // r'
  pitchRightAndMiddle270, // r
  pitchAll90, // X'
  pitchAll270, // X

  rollFront90, // F'
  rollFront180, // F2
  rollFront270, // F
  rollMiddle90, // S'
  rollMiddle270, // S
  rollBack90, // B
  rollBack180, // B2
  rollBack270, // B'
  rollFrontAndMiddle90, // f'
  rollFrontAndMiddle270, // f
  rollBackAndMiddle90, // b
  rollBackAndMiddle270, // b'
  rollAll90, // Z'
  rollAll270 // Z
]

const makeMoveDataEntry = (rotationMatrix3, coordsList, numTurns, oppositeMove) => ({
  rotationMatrix3,
  coordsList,
  numTurns,
  oppositeMove
})

export const MOVE_DATA = new Map([
  [yawTop90, makeMoveDataEntry(R.Y90, CL.topCoordsList, 1, yawTop270)],
  [yawTop180, makeMoveDataEntry(R.Y180, CL.topCoordsList, 2, yawTop180)],
  [yawTop270, makeMoveDataEntry(R.Y270, CL.topCoordsList, 1, yawTop90)],
  [yawMiddle90, makeMoveDataEntry(R.Y90, CL.yawMiddleCoordsList, 1, yawMiddle270)],
  [yawMiddle270, makeMoveDataEntry(R.Y270, CL.yawMiddleCoordsList, 1, yawMiddle90)],
  [yawBottom90, makeMoveDataEntry(R.Y90, CL.bottomCoordsList, 1, yawBottom270)],
  [yawBottom180, makeMoveDataEntry(R.Y180, CL.bottomCoordsList, 2, yawBottom180)],
  [yawBottom270, makeMoveDataEntry(R.Y270, CL.bottomCoordsList, 1, yawBottom90)],
  [yawTopAndMiddle90, makeMoveDataEntry(R.Y90, CL.topAndMiddleCoordsList, 1, yawTopAndMiddle270)],
  [yawTopAndMiddle270, makeMoveDataEntry(R.Y270, CL.topAndMiddleCoordsList, 1, yawTopAndMiddle90)],
  [yawBottomAndMiddle90, makeMoveDataEntry(R.Y90, CL.bottomAndMiddleCoordsList, 1, yawBottomAndMiddle270)],
  [yawBottomAndMiddle270, makeMoveDataEntry(R.Y270, CL.bottomAndMiddleCoordsList, 1, yawBottomAndMiddle90)],
  [yawAll90, makeMoveDataEntry(R.Y90, CL.allCoordsList, 1, yawAll270)],
  [yawAll270, makeMoveDataEntry(R.Y270, CL.allCoordsList, 1, yawAll90)],

  [pitchLeft90, makeMoveDataEntry(R.X90, CL.leftCoordsList, 1, pitchLeft270)],
  [pitchLeft180, makeMoveDataEntry(R.X180, CL.leftCoordsList, 2, pitchLeft180)],
  [pitchLeft270, makeMoveDataEntry(R.X270, CL.leftCoordsList, 1, pitchLeft90)],
  [pitchMiddle90, makeMoveDataEntry(R.X90, CL.pitchMiddleCoordsList, 1, pitchMiddle270)],
  [pitchMiddle270, makeMoveDataEntry(R.X270, CL.pitchMiddleCoordsList, 1, pitchMiddle90)],
  [pitchRight90, makeMoveDataEntry(R.X90, CL.rightCoordsList, 1, pitchRight270)],
  [pitchRight180, makeMoveDataEntry(R.X180, CL.rightCoordsList, 2, pitchRight180)],
  [pitchRight270, makeMoveDataEntry(R.X270, CL.rightCoordsList, 1, pitchRight90)],
  [pitchLeftAndMiddle90, makeMoveDataEntry(R.X90, CL.leftAndMiddleCoordsList, 1, pitchLeftAndMiddle270)],
  [pitchLeftAndMiddle270, makeMoveDataEntry(R.X270, CL.leftAndMiddleCoordsList, 1, pitchLeftAndMiddle90)],
  [pitchRightAndMiddle90, makeMoveDataEntry(R.X90, CL.rightAndMiddleCoordsList, 1, pitchRightAndMiddle270)],
  [pitchRightAndMiddle270, makeMoveDataEntry(R.X270, CL.rightAndMiddleCoordsList, 1, pitchRightAndMiddle90)],
  [pitchAll90, makeMoveDataEntry(R.X90, CL.allCoordsList, 1, pitchAll270)],
  [pitchAll270, makeMoveDataEntry(R.X270, CL.allCoordsList, 1, pitchAll90)],

  [rollFront90, makeMoveDataEntry(R.Z90, CL.frontCoordsList, 1, rollFront270)],
  [rollFront180, makeMoveDataEntry(R.Z180, CL.frontCoordsList, 2, rollFront180)],
  [rollFront270, makeMoveDataEntry(R.Z270, CL.frontCoordsList, 1, rollFront90)],
  [rollMiddle90, makeMoveDataEntry(R.Z90, CL.rollMiddleCoordsList, 1, rollMiddle270)],
  [rollMiddle270, makeMoveDataEntry(R.Z270, CL.rollMiddleCoordsList, 1, rollMiddle90)],
  [rollBack90, makeMoveDataEntry(R.Z90, CL.backCoordsList, 1, rollBack270)],
  [rollBack180, makeMoveDataEntry(R.Z180, CL.backCoordsList, 2, rollBack180)],
  [rollBack270, makeMoveDataEntry(R.Z270, CL.backCoordsList, 1, rollBack90)],
  [rollFrontAndMiddle90, makeMoveDataEntry(R.Z90, CL.frontAndMiddleCoordsList, 1, rollFrontAndMiddle270)],
  [rollFrontAndMiddle270, makeMoveDataEntry(R.Z270, CL.frontAndMiddleCoordsList, 1, rollFrontAndMiddle90)],
  [rollBackAndMiddle90, makeMoveDataEntry(R.Z90, CL.backAndMiddleCoordsList, 1, rollBackAndMiddle270)],
  [rollBackAndMiddle270, makeMoveDataEntry(R.Z270, CL.backAndMiddleCoordsList, 1, rollBackAndMiddle90)],
  [rollAll90, makeMoveDataEntry(R.Z90, CL.allCoordsList, 1, rollAll270)],
  [rollAll270, makeMoveDataEntry(R.Z270, CL.allCoordsList, 1, rollAll90)]
])

export const randomMove = () => {
  const randomIndex = Math.floor(Math.random() * MOVES.length)
  return MOVES[randomIndex]
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
