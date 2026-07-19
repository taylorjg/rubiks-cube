import * as math from "mathjs"
import * as CL from "./coordsLists.js"
import { lookupMoveId } from "./index.js"

const CUBE_SIZE = 3

// Quarter-turn clockwise move IDs when viewed from outside each face or slice.
const CLOCKWISE_MOVE_IDS_3 = {
  U: 17,
  D: 9,
  L: 0,
  R: 8,
  F: 24,
  B: 20,
  M: 3,
  E: 12,
  S: 21
}

const FACE_CLOCKWISE_MOVE_IDS = {
  U: CLOCKWISE_MOVE_IDS_3.U,
  D: CLOCKWISE_MOVE_IDS_3.D,
  L: CLOCKWISE_MOVE_IDS_3.L,
  R: CLOCKWISE_MOVE_IDS_3.R,
  F: CLOCKWISE_MOVE_IDS_3.F,
  B: CLOCKWISE_MOVE_IDS_3.B
}

const LOCAL_FACE_NORMALS = {
  up: [0, 1, 0],
  down: [0, -1, 0],
  left: [-1, 0, 0],
  right: [1, 0, 0],
  front: [0, 0, 1],
  back: [0, 0, -1]
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
    const sticker = piece.faces[localFace]
    if (sticker === "-") {
      throw new Error(`No sticker on ${localFace} face of piece at (${x}, ${y}, ${z})`)
    }
    return sticker
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
    for (const delta of [-1, 1]) {
      const move = lookupMoveId(CUBE_SIZE, clockwiseMove.id + delta)
      if (move && move.oppositeMoveId === move.id) {
        return move.id
      }
    }
    throw new Error(`No half-turn move found for face ${face}`)
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

const SLICE_LABELS_3 = {
  x: { [-1]: "L", 0: "M", 1: "R" },
  y: { [-1]: "D", 0: "E", 1: "U" },
  z: { [-1]: "B", 0: "S", 1: "F" }
}

const getSliceLabel = (cubeSize, axis, sliceValue, vmin, vmax) => {
  if (cubeSize === 3) {
    return SLICE_LABELS_3[axis][sliceValue]
  }

  if (axis === "x") {
    if (sliceValue === vmin) return "L"
    if (sliceValue === vmax) return "R"
  }
  if (axis === "y") {
    if (sliceValue === vmin) return "D"
    if (sliceValue === vmax) return "U"
  }
  if (axis === "z") {
    if (sliceValue === vmin) return "B"
    if (sliceValue === vmax) return "F"
  }

  return null
}

// Positive-axis outer faces (R, U, B) need the opposite raw rotation for WCA clockwise.
const getClockwiseOffset = label =>
  label === "R" || label === "U" || label === "B" ? 2 : 0

const buildMoveNotationLookup = cubeSize => {
  const { values, vmin, vmax } = CL.getCubeDimensions(cubeSize)
  const lookup = new Map()
  let sliceIndex = 0

  const addSliceGroup = (axis, sliceValues) => {
    for (const sliceValue of sliceValues) {
      const label = getSliceLabel(cubeSize, axis, sliceValue, vmin, vmax)
      if (label) {
        const baseId = sliceIndex * 3
        const clockwiseMoveId = baseId + getClockwiseOffset(label)
        const clockwiseMove = lookupMoveId(cubeSize, clockwiseMoveId)
        const halfTurnMove = [-1, 1]
          .map(delta => lookupMoveId(cubeSize, clockwiseMoveId + delta))
          .filter(Boolean)
          .find(move => move.oppositeMoveId === move.id)
        lookup.set(clockwiseMoveId, label)
        lookup.set(halfTurnMove.id, `${label}2`)
        lookup.set(clockwiseMove.oppositeMoveId, `${label}'`)
      }
      sliceIndex++
    }
  }

  addSliceGroup("x", values)
  addSliceGroup("y", values)
  addSliceGroup("z", values)

  return lookup
}

const MOVE_NOTATION_LOOKUPS = new Map()

const getMoveNotationLookup = cubeSize => {
  if (!MOVE_NOTATION_LOOKUPS.has(cubeSize)) {
    MOVE_NOTATION_LOOKUPS.set(cubeSize, buildMoveNotationLookup(cubeSize))
  }
  return MOVE_NOTATION_LOOKUPS.get(cubeSize)
}

export const moveToNotation = (move, cubeSize) => {
  const notation = getMoveNotationLookup(cubeSize).get(move.id)
  if (!notation) {
    throw new Error(`Move id ${move.id} has no notation for cube size ${cubeSize}`)
  }
  return notation
}

export const moveToSingmaster = move => moveToNotation(move, CUBE_SIZE)

export const formatSingmaster = moves =>
  moves.map(moveToSingmaster).join(" ")

export const FACE_TURN_FACES = Object.keys(FACE_CLOCKWISE_MOVE_IDS)

const OPPOSITE_FACE = {
  U: "D",
  D: "U",
  L: "R",
  R: "L",
  F: "B",
  B: "F"
}

const QUARTER_TURNS = [1, 2, 3]

export const getRandomFaceMove = () => {
  const face = FACE_TURN_FACES[Math.floor(Math.random() * FACE_TURN_FACES.length)]
  const quarterTurns = QUARTER_TURNS[Math.floor(Math.random() * QUARTER_TURNS.length)]
  return lookupMoveId(CUBE_SIZE, lookupFaceMoveId(face, quarterTurns))
}

export const generateFaceTurnScramble = length => {
  const moves = []
  let lastFace = null

  for (let i = 0; i < length; i++) {
    const excludedFaces = new Set()
    if (lastFace) {
      excludedFaces.add(lastFace)
      excludedFaces.add(OPPOSITE_FACE[lastFace])
    }

    const availableFaces = FACE_TURN_FACES.filter(face => !excludedFaces.has(face))
    const face = availableFaces[Math.floor(Math.random() * availableFaces.length)]
    const quarterTurns = QUARTER_TURNS[Math.floor(Math.random() * QUARTER_TURNS.length)]
    moves.push(lookupMoveId(CUBE_SIZE, lookupFaceMoveId(face, quarterTurns)))
    lastFace = face
  }

  return moves
}

export const isFaceTurn = move => {
  try {
    moveToSingmaster(move)
    return true
  } catch {
    return false
  }
}
