import math, { matrix } from 'mathjs';
import * as CL from './coordsLists';
import * as R from './rotations';
import * as C from './constants';

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

const pieceHasCoords = (piece, coords) =>
  piece.x === coords[0] &&
  piece.y === coords[1] &&
  piece.z === coords[2];

const getPieces = (cube, coordsList) =>
  coordsList.map(coords =>
    cube.find(piece => pieceHasCoords(piece, coords)));

const isPieceInCoordsList = (piece, coordsList) =>
  coordsList.findIndex(coords => pieceHasCoords(piece, coords)) >= 0;

export const getTopFace = cube =>
  getPieces(cube, CL.topCoordsList).map(piece => piece.colours[C.TOP]);

export const getLeftFace = cube =>
  getPieces(cube, CL.leftCoordsList).map(piece => piece.colours[C.LEFT]);

export const getFrontFace = cube =>
  getPieces(cube, CL.frontCoordsList).map(piece => piece.colours[C.FRONT]);

export const getRightFace = cube =>
  getPieces(cube, CL.rightCoordsList).map(piece => piece.colours[C.RIGHT]);

export const getBackFace = cube =>
  getPieces(cube, CL.backCoordsList).map(piece => piece.colours[C.BACK]);

export const getBottomFace = cube =>
  getPieces(cube, CL.bottomCoordsList).map(piece => piece.colours[C.BOTTOM]);

const DIGIT_ZERO_CHAR_CODE = 48;
const reorderColours = (colours, newColoursOrder) => {
  const chs1 = Array.from(colours);
  const idxs = Array.from(newColoursOrder).map(ch => ch.charCodeAt(0) - DIGIT_ZERO_CHAR_CODE);
  const chs2 = idxs.map(idx => chs1[idx]);
  return chs2.join("");
};

const transform = (rotationMatrix, newColoursOrder) => piece => {
  const vector = matrix([piece.x, piece.y, piece.z]);
  const rotatedVector = math.multiply(vector, rotationMatrix);
  return {
    id: piece.id,
    x: rotatedVector.get([0]),
    y: rotatedVector.get([1]),
    z: rotatedVector.get([2]),
    colours: reorderColours(piece.colours, newColoursOrder)
  };
};

const transformPieces = (cube, coordsList, transform) =>
  cube.map(piece => isPieceInCoordsList(piece, coordsList)
    ? transform(piece)
    : piece);

export const yawTop90 = cube =>
  transformPieces(cube, CL.topCoordsList, transform(R.Y90, "023415"));

export const yawTop180 = cube =>
  transformPieces(cube, CL.topCoordsList, transform(R.Y180, "034125"));

export const yawTop270 = cube =>
  transformPieces(cube, CL.topCoordsList, transform(R.Y270, "041235"));

export const yawMiddle90 = cube =>
  transformPieces(cube, CL.yawMiddleCoordsList, transform(R.Y90, "023415"));

export const yawMiddle180 = cube =>
  transformPieces(cube, CL.yawMiddleCoordsList, transform(R.Y180, "034125"));

export const yawMiddle270 = cube =>
  transformPieces(cube, CL.yawMiddleCoordsList, transform(R.Y270, "041235"));

export const yawBottom90 = cube =>
  transformPieces(cube, CL.bottomCoordsList, transform(R.Y90, "023415"));

export const yawBottom180 = cube =>
  transformPieces(cube, CL.bottomCoordsList, transform(R.Y180, "034125"));

export const yawBottom270 = cube =>
  transformPieces(cube, CL.bottomCoordsList, transform(R.Y270, "041235"));

export const pitchLeft90 = cube =>
  transformPieces(cube, CL.leftCoordsList, transform(R.X90, "215304"));

export const pitchLeft180 = cube =>
  transformPieces(cube, CL.leftCoordsList, transform(R.X180, "514320"));

export const pitchLeft270 = cube =>
  transformPieces(cube, CL.leftCoordsList, transform(R.X270, "410352"));

export const pitchMiddle90 = cube =>
  transformPieces(cube, CL.pitchMiddleCoordsList, transform(R.X90, "215304"));

export const pitchMiddle180 = cube =>
  transformPieces(cube, CL.pitchMiddleCoordsList, transform(R.X180, "514320"));

export const pitchMiddle270 = cube =>
  transformPieces(cube, CL.pitchMiddleCoordsList, transform(R.X270, "410352"));

export const pitchRight90 = cube =>
  transformPieces(cube, CL.rightCoordsList, transform(R.X90, "215304"));

export const pitchRight180 = cube =>
  transformPieces(cube, CL.rightCoordsList, transform(R.X180, "514320"));

export const pitchRight270 = cube =>
  transformPieces(cube, CL.rightCoordsList, transform(R.X270, "410352"));

export const rollFront90 = cube =>
  transformPieces(cube, CL.frontCoordsList, transform(R.Z90, "302541"));

export const rollFront180 = cube =>
  transformPieces(cube, CL.frontCoordsList, transform(R.Z180, "532140"));

export const rollFront270 = cube =>
  transformPieces(cube, CL.frontCoordsList, transform(R.Z270, "152043"));

export const rollMiddle90 = cube =>
  transformPieces(cube, CL.rollMiddleCoordsList, transform(R.Z90, "302541"));

export const rollMiddle180 = cube =>
  transformPieces(cube, CL.rollMiddleCoordsList, transform(R.Z180, "532140"));

export const rollMiddle270 = cube =>
  transformPieces(cube, CL.rollMiddleCoordsList, transform(R.Z270, "152043"));

export const rollBack90 = cube =>
  transformPieces(cube, CL.backCoordsList, transform(R.Z90, "302541"));

export const rollBack180 = cube =>
  transformPieces(cube, CL.backCoordsList, transform(R.Z180, "532140"));

export const rollBack270 = cube =>
  transformPieces(cube, CL.backCoordsList, transform(R.Z270, "152043"));

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
// const cube1 = rollFront90(solvedCube);
// dumpCube(cube1);