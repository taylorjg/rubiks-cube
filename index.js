import math, { matrix } from 'mathjs';

const solvedCube = [
  // top layer
  { id: 1, x: 0, y: 2, z: 0, colours: "BRY---" },
  { id: 2, x: 1, y: 2, z: 0, colours: "B-Y---" },
  { id: 3, x: 2, y: 2, z: 0, colours: "B-YO--" },
  { id: 4, x: 0, y: 2, z: 1, colours: "BR----" },
  { id: 5, x: 1, y: 2, z: 1, colours: "B-----" },
  { id: 6, x: 2, y: 2, z: 1, colours: "B--O--" },
  { id: 7, x: 0, y: 2, z: 2, colours: "BR--W-" },
  { id: 8, x: 1, y: 2, z: 2, colours: "B---W-" },
  { id: 9, x: 2, y: 2, z: 2, colours: "B--OW-" },

  // middle layer
  { id: 10, x: 0, y: 1, z: 0, colours: "-RY---" },
  { id: 11, x: 1, y: 1, z: 0, colours: "--Y---" },
  { id: 12, x: 2, y: 1, z: 0, colours: "--YO--" },
  { id: 13, x: 0, y: 1, z: 1, colours: "-R----" },
  { id: 14, x: 1, y: 1, z: 1, colours: "------" },
  { id: 15, x: 2, y: 1, z: 1, colours: "---O--" },
  { id: 16, x: 0, y: 1, z: 2, colours: "-R--W-" },
  { id: 17, x: 1, y: 1, z: 2, colours: "----W-" },
  { id: 18, x: 2, y: 1, z: 2, colours: "---OW-" },

  // bottom layer
  { id: 19, x: 0, y: 0, z: 0, colours: "-RY--G" },
  { id: 20, x: 1, y: 0, z: 0, colours: "--Y--G" },
  { id: 21, x: 2, y: 0, z: 0, colours: "--YO-G" },
  { id: 22, x: 0, y: 0, z: 1, colours: "-R---G" },
  { id: 23, x: 1, y: 0, z: 1, colours: "-----G" },
  { id: 24, x: 2, y: 0, z: 1, colours: "---O-G" },
  { id: 25, x: 0, y: 0, z: 2, colours: "-R--WG" },
  { id: 26, x: 1, y: 0, z: 2, colours: "----WG" },
  { id: 27, x: 2, y: 0, z: 2, colours: "---OWG" }
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

const getTopFace = cube =>
  getPieces(cube, topCoordsList).map(piece => piece.colours[0]);

const getLeftFace = cube =>
  getPieces(cube, leftCoordsList).map(piece => piece.colours[1]);

const getFrontFace = cube =>
  getPieces(cube, frontCoordsList).map(piece => piece.colours[2]);

const getRightFace = cube =>
  getPieces(cube, rightCoordsList).map(piece => piece.colours[3]);

const getBackFace = cube =>
  getPieces(cube, backCoordsList).map(piece => piece.colours[4]);

const getBottomFace = cube =>
  getPieces(cube, bottomCoordsList).map(piece => piece.colours[5]);

const axisToTranslation = axis => {
  switch (axis) {
    case X_AXIS: return matrix([0, -1, -1]);
    case Y_AXIS: return matrix([-1, 0, -1]);
    case Z_AXIS: return matrix([-1, -1, 0]);
  }
};

const reorderColours = (colours, newColoursOrder) =>
    // TODO: reorder piece.colours using newColoursOrder
    colours;

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

const yawTop90 = cube =>
  transformPieces(cube, topCoordsList, transform(RY90, Y_AXIS, "023415"));

const yawMiddle90 = cube => {
  return cube;
};

const yawBottom90 = cube => {
  return cube;
};

const pitchLeft90 = cube => {
  return cube;
};

const pitchMiddle90 = cube => {
  return cube;
};

const pitchRight90 = cube => {
  return cube;
};

const rollFront90 = cube => {
  return cube;
};

const rollMiddle90 = cube => {
  return cube;
};

const rollBack90 = cube => {
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

dumpCube(solvedCube);

const cube1 = yawTop90(solvedCube);
console.log(`cube1: ${JSON.stringify(cube1.slice(0, 9))}`);
dumpCube(cube1);
