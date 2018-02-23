import math, { matrix } from 'mathjs';

export const solvedCube = [
  // top layer
  { x: -1, y: 1, z: -1, colours: "BRY---" },
  { x: 0, y: 1, z: -1, colours: "B-Y---" },
  { x: 1, y: 1, z: -1, colours: "B-YO--" },
  { x: -1, y: 1, z: 0, colours: "BR----" },
  { x: 0, y: 1, z: 0, colours: "B-----" },
  { x: 1, y: 1, z: 0, colours: "B--O--" },
  { x: -1, y: 1, z: 1, colours: "BR--W-" },
  { x: 0, y: 1, z: 1, colours: "B---W-" },
  { x: 1, y: 1, z: 1, colours: "B--OW-" },

  // middle layer
  { x: -1, y: 0, z: -1, colours: "-RY---" },
  { x: 0, y: 0, z: -1, colours: "--Y---" },
  { x: 1, y: 0, z: -1, colours: "--YO--" },
  { x: -1, y: 0, z: 0, colours: "-R----" },
  { x: 0, y: 0, z: 0, colours: "------" },
  { x: 1, y: 0, z: 0, colours: "---O--" },
  { x: -1, y: 0, z: 1, colours: "-R--W-" },
  { x: 0, y: 0, z: 1, colours: "----W-" },
  { x: 1, y: 0, z: 1, colours: "---OW-" },

  // bottom layer
  { x: -1, y: -1, z: -1, colours: "-RY--G" },
  { x: 0, y: -1, z: -1, colours: "--Y--G" },
  { x: 1, y: -1, z: -1, colours: "--YO-G" },
  { x: -1, y: -1, z: 0, colours: "-R---G" },
  { x: 0, y: -1, z: 0, colours: "-----G" },
  { x: 1, y: -1, z: 0, colours: "---O-G" },
  { x: -1, y: -1, z: 1, colours: "-R--WG" },
  { x: 0, y: -1, z: 1, colours: "----WG" },
  { x: 1, y: -1, z: 1, colours: "---OWG" }
];

const topCoordsList = [
  [-1, 1, -1],
  [0, 1, -1],
  [1, 1, -1],
  [-1, 1, 0],
  [0, 1, 0],
  [1, 1, 0],
  [-1, 1, 1],
  [0, 1, 1],
  [1, 1, 1]
];

const leftCoordsList = [
  [-1, 1, 1],
  [-1, 1, 0],
  [-1, 1, -1],
  [-1, 0, 1],
  [-1, 0, 0],
  [-1, 0, -1],
  [-1, -1, 1],
  [-1, -1, 0],
  [-1, -1, -1]
];

const frontCoordsList = [
  [-1, 1, -1],
  [0, 1, -1],
  [1, 1, -1],
  [-1, 0, -1],
  [0, 0, -1],
  [1, 0, -1],
  [-1, -1, -1],
  [0, -1, -1],
  [1, -1, -1]
];

const rightCoordsList = [
  [1, 1, -1],
  [1, 1, 0],
  [1, 1, 1],
  [1, 0, -1],
  [1, 0, 0],
  [1, 0, 1],
  [1, -1, -1],
  [1, -1, 0],
  [1, -1, 1]
];

const backCoordsList = [
  [1, 1, 1],
  [0, 1, 1],
  [-1, 1, 1],
  [1, 0, 1],
  [0, 0, 1],
  [-1, 0, 1],
  [1, -1, 1],
  [0, -1, 1],
  [-1, -1, 1]
];

const bottomCoordsList = [
  [-1, -1, -1],
  [0, -1, -1],
  [1, -1, -1],
  [-1, -1, 0],
  [0, -1, 0],
  [1, -1, 0],
  [-1, -1, 1],
  [0, -1, 1],
  [1, -1, 1]
];

// TODO: we need three more coords lists:
// - pitchMiddleCoordsList
// - rollMiddleCoordsList

const yawMiddleCoordsList = [
  [-1, 0, -1],
  [0, 0, -1],
  [1, 0, -1],
  [-1, 0, 0],
  [0, 0, 0],
  [1, 0, 0],
  [-1, 0, 1],
  [0, 0, 1],
  [1, 0, 1]
];

const RY90 = matrix([
  [0, 0, -1],
  [0, 1, 0,],
  [1, 0, 0]
]);

const RY180 = matrix([
  [-1, 0, 0],
  [0, 1, 0],
  [0, 0, -1]
]);

const RY270 = matrix([
  [0, 0, 1],
  [0, 1, 0],
  [-1, 0, 0]
]);

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

const ZERO = 48;
const reorderColours = (colours, newColoursOrder) => {
  const chs1 = Array.from(colours);
  const idxs = Array.from(newColoursOrder).map(ch => ch.charCodeAt(0) - ZERO);
  const chs2 = idxs.map(idx => chs1[idx]);
  return chs2.join("");
};

const transform = (r, newColoursOrder) => piece => {
  const v1 = matrix([piece.x, piece.y, piece.z]);
  const v2 = math.multiply(v1, r);
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
  transformPieces(cube, topCoordsList, transform(RY90, "023415"));

export const yawTop180 = cube =>
  transformPieces(cube, topCoordsList, transform(RY180, "034125"));

export const yawTop270 = cube =>
  transformPieces(cube, topCoordsList, transform(RY270, "041235"));

export const yawMiddle90 = cube =>
  transformPieces(cube, yawMiddleCoordsList, transform(RY90, "023415"));

export const yawMiddle180 = cube =>
  transformPieces(cube, yawMiddleCoordsList, transform(RY180, "034125"));

export const yawMiddle270 = cube =>
  transformPieces(cube, yawMiddleCoordsList, transform(RY270, "041235"));

export const yawBottom90 = cube =>
  transformPieces(cube, bottomCoordsList, transform(RY90, "023415"));

export const yawBottom180 = cube =>
  transformPieces(cube, bottomCoordsList, transform(RY180, "034125"));

export const yawBottom270 = cube =>
  transformPieces(cube, bottomCoordsList, transform(RY270, "041235"));

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
