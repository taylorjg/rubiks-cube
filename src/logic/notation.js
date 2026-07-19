import * as math from "mathjs"
import { lookupMoveId } from "./index.js"

const CUBE_SIZE = 3

// Quarter-turn clockwise move IDs when viewed from outside each face.
const FACE_CLOCKWISE_MOVE_IDS = {
  U: 15,
  D: 9,
  L: 0,
  R: 6,
  F: 24,
  B: 20
}

const LOCAL_FACE_NORMALS = {
  up: [0, 1, 0],
  down: [0, -1, 0],
  left: [-1, 0, 0],
  right: [1, 0, 0],
  front: [0, 0, 1],
  back: [0, 0, -1]
}

const LOCAL_FACE_TO_STICKER = {
  up: "U",
  down: "D",
  left: "L",
  right: "R",
  front: "F",
  back: "B"
}

const WORLD_NORMAL_TO_LOCAL_FACE = Object.fromEntries(
  Object.entries(LOCAL_FACE_NORMALS).map(([face, normal]) => [
    normal.join(","),
    face
  ])
)

// Kociemba facelet order: U, R, F, D, L, B — each read row-by-row top to bottom,
// left to right, when looking directly at that face from outside the cube.
const FACELET_POSITIONS = [
  ...faceCoords("U", [
    [-1, 1, 1], [0, 1, 1], [1, 1, 1],
    [-1, 1, 0], [0, 1, 0], [1, 1, 0],
    [-1, 1, -1], [0, 1, -1], [1, 1, -1]
  ]),
  ...faceCoords("R", [
    [1, 1, 1], [1, 1, 0], [1, 1, -1],
    [1, 0, 1], [1, 0, 0], [1, 0, -1],
    [1, -1, 1], [1, -1, 0], [1, -1, -1]
  ]),
  ...faceCoords("F", [
    [-1, 1, 1], [0, 1, 1], [1, 1, 1],
    [-1, 0, 1], [0, 0, 1], [1, 0, 1],
    [-1, -1, 1], [0, -1, 1], [1, -1, 1]
  ]),
  ...faceCoords("D", [
    [-1, -1, 1], [0, -1, 1], [1, -1, 1],
    [-1, -1, 0], [0, -1, 0], [1, -1, 0],
    [-1, -1, -1], [0, -1, -1], [1, -1, -1]
  ]),
  ...faceCoords("L", [
    [-1, 1, -1], [-1, 1, 0], [-1, 1, 1],
    [-1, 0, -1], [-1, 0, 0], [-1, 0, 1],
    [-1, -1, -1], [-1, -1, 0], [-1, -1, 1]
  ]),
  ...faceCoords("B", [
    [1, 1, -1], [0, 1, -1], [-1, 1, -1],
    [1, 0, -1], [0, 0, -1], [-1, 0, -1],
    [1, -1, -1], [0, -1, -1], [-1, -1, -1]
  ])
]

function faceCoords(face, coordsList) {
  const outwardNormal = LOCAL_FACE_NORMALS[faceNameToLocalFace(face)]
  return coordsList.map(coords => ({ coords, outwardNormal }))
}

function faceNameToLocalFace(face) {
  switch (face) {
    case "U": return "up"
    case "D": return "down"
    case "L": return "left"
    case "R": return "right"
    case "F": return "front"
    case "B": return "back"
    default:
      throw new Error(`Unknown face: ${face}`)
  }
}

const findPieceAt = (cube, x, y, z) =>
  cube.find(piece => piece.x === x && piece.y === y && piece.z === z)

const worldNormalToLocalFace = (piece, outwardNormal) => {
  const inverseTransform = math.inv(piece.accTransform3)
  const localNormalMatrix = math.multiply(
    math.matrix([outwardNormal]),
    inverseTransform
  )
  const localNormal = localNormalMatrix.toArray()[0].map(Math.round)
  const key = localNormal.join(",")
  const localFace = WORLD_NORMAL_TO_LOCAL_FACE[key]
  if (!localFace) {
    throw new Error(`Unable to map world normal ${outwardNormal} to a local face`)
  }
  return localFace
}

export const exportFacelets = cube => {
  if (cube.length !== 26) {
    throw new Error("Facelet export is only supported for 3×3 cubes")
  }

  return FACELET_POSITIONS.map(({ coords, outwardNormal }) => {
    const [x, y, z] = coords
    const piece = findPieceAt(cube, x, y, z)
    if (!piece) {
      throw new Error(`No piece found at (${x}, ${y}, ${z})`)
    }
    const localFace = worldNormalToLocalFace(piece, outwardNormal)
    return LOCAL_FACE_TO_STICKER[localFace]
  }).join("")
}

export const isSolved = cube => {
  const facelets = exportFacelets(cube)
  return FACELET_POSITIONS.every(({ coords, outwardNormal }, index) => {
    const [x, y, z] = coords
    const expected = outwardNormal[1] === 1 ? "U"
      : outwardNormal[1] === -1 ? "D"
      : outwardNormal[0] === -1 ? "L"
      : outwardNormal[0] === 1 ? "R"
      : outwardNormal[2] === 1 ? "F"
      : "B"
    return facelets[index] === expected
  })
}

export const lookupFaceMoveId = (face, quarterTurns) => {
  const normalizedTurns = ((quarterTurns % 4) + 4) % 4
  if (normalizedTurns === 0) {
    return undefined
  }

  const clockwiseMoveId = FACE_CLOCKWISE_MOVE_IDS[face]
  if (clockwiseMoveId === undefined) {
    throw new Error(`Unknown face: ${face}`)
  }

  const clockwiseMove = lookupMoveId(CUBE_SIZE, clockwiseMoveId)
  if (normalizedTurns === 1) {
    return clockwiseMove.id
  }
  if (normalizedTurns === 2) {
    return clockwiseMove.id + 1
  }
  return clockwiseMove.oppositeMoveId
}

export const parseMoveToken = token => {
  const match = /^([UDLRFB])(2|')?$/.exec(token)
  if (!match) {
    throw new Error(`Invalid move token: ${token}`)
  }

  const face = match[1]
  const suffix = match[2] ?? ""
  const quarterTurns = suffix === "2" ? 2 : suffix === "'" ? 3 : 1
  const moveId = lookupFaceMoveId(face, quarterTurns)
  return lookupMoveId(CUBE_SIZE, moveId)
}

export const parseSingmaster = algorithm =>
  algorithm
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(token => parseMoveToken(token))

export const moveToSingmaster = move => {
  for (const [face, clockwiseMoveId] of Object.entries(FACE_CLOCKWISE_MOVE_IDS)) {
    if (move.id === clockwiseMoveId) return face
    if (move.id === clockwiseMoveId + 1) return `${face}2`
    if (move.id === lookupMoveId(CUBE_SIZE, clockwiseMoveId).oppositeMoveId) {
      return `${face}'`
    }
  }
  throw new Error(`Move id ${move.id} is not a 3×3 face turn`)
}

export const formatSingmaster = moves =>
  moves.map(moveToSingmaster).join(" ")

export const FACE_TURN_FACES = Object.keys(FACE_CLOCKWISE_MOVE_IDS)
