import math, { matrix } from 'mathjs';

export const solvedCube = [
  // top layer
  { x: 0, y: 2, z: 0, colours: "BRY---" },
  { x: 1, y: 2, z: 0, colours: "B-Y---" },
  { x: 2, y: 2, z: 0, colours: "B-YO--" },
  { x: 0, y: 2, z: 1, colours: "BR----" },
  { x: 1, y: 2, z: 1, colours: "B-----" },
  { x: 2, y: 2, z: 1, colours: "B--O--" },
  { x: 0, y: 2, z: 2, colours: "BR--W-" },
  { x: 1, y: 2, z: 2, colours: "B---W-" },
  { x: 2, y: 2, z: 2, colours: "B--OW-" },

  // middle layer
  { x: 0, y: 1, z: 0, colours: "-RY---" },
  { x: 1, y: 1, z: 0, colours: "--Y---" },
  { x: 2, y: 1, z: 0, colours: "--YO--" },
  { x: 0, y: 1, z: 1, colours: "-R----" },
  { x: 1, y: 1, z: 1, colours: "------" },
  { x: 2, y: 1, z: 1, colours: "---O--" },
  { x: 0, y: 1, z: 2, colours: "-R--W-" },
  { x: 1, y: 1, z: 2, colours: "----W-" },
  { x: 2, y: 1, z: 2, colours: "---OW-" },

  // bottom layer
  { x: 0, y: 0, z: 0, colours: "-RY--G" },
  { x: 1, y: 0, z: 0, colours: "--Y--G" },
  { x: 2, y: 0, z: 0, colours: "--YO-G" },
  { x: 0, y: 0, z: 1, colours: "-R---G" },
  { x: 1, y: 0, z: 1, colours: "-----G" },
  { x: 2, y: 0, z: 1, colours: "---O-G" },
  { x: 0, y: 0, z: 2, colours: "-R--WG" },
  { x: 1, y: 0, z: 2, colours: "----WG" },
  { x: 2, y: 0, z: 2, colours: "---OWG" }
];

const topCoordsList = [
  [0, 2, 0],
  [1, 2, 0],
  [2, 2, 0],
  [0, 2, 1],
  [1, 2, 1],
  [2, 2, 1],
  [0, 2, 2],
  [1, 2, 2],
  [2, 2, 2]
];

const leftCoordsList = [
  [0, 2, 2],
  [0, 2, 1],
  [0, 2, 0],
  [0, 1, 2],
  [0, 1, 1],
  [0, 1, 0],
  [0, 0, 2],
  [0, 0, 1],
  [0, 0, 0]
];

const frontCoordsList = [
  [0, 2, 0],
  [1, 2, 0],
  [2, 2, 0],
  [0, 1, 0],
  [1, 1, 0],
  [2, 1, 0],
  [0, 0, 0],
  [1, 0, 0],
  [2, 0, 0]
];

const rightCoordsList = [
  [2, 2, 0],
  [2, 2, 1],
  [2, 2, 2],
  [2, 1, 0],
  [2, 1, 1],
  [2, 1, 2],
  [2, 0, 0],
  [2, 0, 1],
  [2, 0, 2]
];

const backCoordsList = [
  [2, 2, 2],
  [1, 2, 2],
  [0, 2, 2],
  [2, 1, 2],
  [1, 1, 2],
  [0, 1, 2],
  [2, 0, 2],
  [1, 0, 2],
  [0, 0, 2]
];

const bottomCoordsList = [
  [0, 0, 0],
  [1, 0, 0],
  [2, 0, 0],
  [0, 0, 1],
  [1, 0, 1],
  [2, 0, 1],
  [0, 0, 2],
  [1, 0, 2],
  [2, 0, 2]
];

// TODO: we need three more coords lists:
// - yawMiddleCoordsList
// - pitchMiddleCoordsList
// - rollMiddleCoordsList

const RY90 = matrix([
  [0, 0, -1],
  [0, 1, 0,],
  [1, 0, 0]
]);

const X_AXIS = "X";
const Y_AXIS = "Y";
const Z_AXIS = "Z";

const TOP = 0;
const LEFT = 1;
const FRONT = 2;
const RIGHT = 3;
const BACK = 4;
const BOTTOM = 5;

const pieceHasCoords = coords => piece =>
  piece.x === coords[0] &&
  piece.y === coords[1] &&
  piece.z === coords[2];

const getPieces = (cube, coordsList) =>
  coordsList.map(coords =>
    cube.find(pieceHasCoords(coords)));

const isPieceInCoordsList = (coordsList, piece) =>
  coordsList.findIndex(coords =>
    coords[0] === piece.x &&
    coords[1] === piece.y &&
    coords[2] === piece.z) >= 0;

export const getTopFace = cube =>
  getPieces(cube, topCoordsList).map(piece => piece.colours[TOP]);

export const getLeftFace = cube =>
  getPieces(cube, leftCoordsList).map(piece => piece.colours[LEFT]);

export const getFrontFace = cube =>
  getPieces(cube, frontCoordsList).map(piece => piece.colours[FRONT]);

export const getRightFace = cube =>
  getPieces(cube, rightCoordsList).map(piece => piece.colours[RIGHT]);

export const getBackFace = cube =>
  getPieces(cube, backCoordsList).map(piece => piece.colours[BACK]);

export const getBottomFace = cube =>
  getPieces(cube, bottomCoordsList).map(piece => piece.colours[BOTTOM]);

const axisToTranslation = axis => {
  switch (axis) {
    case X_AXIS: return matrix([0, -1, -1]);
    case Y_AXIS: return matrix([-1, 0, -1]);
    case Z_AXIS: return matrix([-1, -1, 0]);
  }
};

const ZERO = 48;
const reorderColours = (colours, newColoursOrder) => {
  const chs1 = Array.from(colours);
  const idxs = Array.from(newColoursOrder).map(ch => ch.charCodeAt(0) - ZERO);
  const chs2 = idxs.map(idx => chs1[idx]);
  return chs2.join("");
};

const transform = (r, axis, newColoursOrder) => piece => {
  const p1 = axisToTranslation(axis);
  const p2 = p1.map(x => -x);
  const p = math.add(math.multiply(p1, r), p2);
  const m = math.eye(4)
    .subset(math.index([0, 1, 2], [0, 1, 2]), r)
    .subset(math.index(3, [0, 1, 2]), p);
  const v1 = matrix([piece.x, piece.y, piece.z, 1]);
  const v2 = math.multiply(v1, m);
  return {
    id: piece.id,
    x: v2.get([0]),
    y: v2.get([1]),
    z: v2.get([2]),
    colours: reorderColours(piece.colours, newColoursOrder)
  };
};

const transformPieces = (cube, coordsList, transform) =>
  cube.map(piece => isPieceInCoordsList(coordsList, piece)
    ? transform(piece)
    : piece);

export const yawTop90 = cube =>
  transformPieces(cube, topCoordsList, transform(RY90, Y_AXIS, "023415"));

export const yawMiddle90 = cube => {
  return cube;
};

export const yawBottom90 = cube => {
  return cube;
};

export const pitchLeft90 = cube => {
  return cube;
};

export const pitchMiddle90 = cube => {
  return cube;
};

export const pitchRight90 = cube => {
  return cube;
};

export const rollFront90 = cube => {
  return cube;
};

export const rollMiddle90 = cube => {
  return cube;
};

export const rollBack90 = cube => {
  return cube;
};

const dumpCube = cube => {

  const topFace = getTopFace(cube);
  const leftFace = getLeftFace(cube);
  const frontFace = getFrontFace(cube);
  const rightFace = getRightFace(cube);
  const backFace = getBackFace(cube);
  const bottomFace = getBottomFace(cube);

  const three = (x, from, to) => x.slice(from, to).join('');
  const line = (f, t) => {
    console.log(`${three(topFace, f, t)}  ${three(leftFace, f, t)}   ${three(frontFace, f, t)}    ${three(rightFace, f, t)}    ${three(backFace, f, t)}   ${three(bottomFace, f, t)}`);
  };

  console.log('Top  Left  Front  Right  Back  Bottom');
  line(0, 3);
  line(3, 6);
  line(6, 9);
};

// dumpCube(solvedCube);
// const cube1 = yawTop90(solvedCube);
// dumpCube(cube1);
