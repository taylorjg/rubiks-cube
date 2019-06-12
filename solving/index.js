import * as math from 'mathjs';
import * as CL from './coordsLists';
import * as R from './rotations';
import * as C from './constants';

export const solvedCube = [
  // top layer
  { id: 1, x: -1, y: 1, z: 1, colours: "BRY---", accTransform: math.identity(3) },
  { id: 2, x: 0, y: 1, z: 1, colours: "B-Y---", accTransform: math.identity(3) },
  { id: 3, x: 1, y: 1, z: 1, colours: "B-YO--", accTransform: math.identity(3) },
  { id: 4, x: -1, y: 1, z: 0, colours: "BR----", accTransform: math.identity(3) },
  { id: 5, x: 0, y: 1, z: 0, colours: "B-----", accTransform: math.identity(3) },
  { id: 6, x: 1, y: 1, z: 0, colours: "B--O--", accTransform: math.identity(3) },
  { id: 7, x: -1, y: 1, z: -1, colours: "BR--W-", accTransform: math.identity(3) },
  { id: 8, x: 0, y: 1, z: -1, colours: "B---W-", accTransform: math.identity(3) },
  { id: 9, x: 1, y: 1, z: -1, colours: "B--OW-", accTransform: math.identity(3) },

  // middle layer
  { id: 10, x: -1, y: 0, z: 1, colours: "-RY---", accTransform: math.identity(3) },
  { id: 11, x: 0, y: 0, z: 1, colours: "--Y---", accTransform: math.identity(3) },
  { id: 12, x: 1, y: 0, z: 1, colours: "--YO--", accTransform: math.identity(3) },
  { id: 13, x: -1, y: 0, z: 0, colours: "-R----", accTransform: math.identity(3) },
  { id: 14, x: 1, y: 0, z: 0, colours: "---O--", accTransform: math.identity(3) },
  { id: 15, x: -1, y: 0, z: -1, colours: "-R--W-", accTransform: math.identity(3) },
  { id: 16, x: 0, y: 0, z: -1, colours: "----W-", accTransform: math.identity(3) },
  { id: 17, x: 1, y: 0, z: -1, colours: "---OW-", accTransform: math.identity(3) },

  // bottom layer
  { id: 18, x: -1, y: -1, z: 1, colours: "-RY--G", accTransform: math.identity(3) },
  { id: 19, x: 0, y: -1, z: 1, colours: "--Y--G", accTransform: math.identity(3) },
  { id: 20, x: 1, y: -1, z: 1, colours: "--YO-G", accTransform: math.identity(3) },
  { id: 21, x: -1, y: -1, z: 0, colours: "-R---G", accTransform: math.identity(3) },
  { id: 22, x: 0, y: -1, z: 0, colours: "-----G", accTransform: math.identity(3) },
  { id: 23, x: 1, y: -1, z: 0, colours: "---O-G", accTransform: math.identity(3) },
  { id: 24, x: -1, y: -1, z: -1, colours: "-R--WG", accTransform: math.identity(3) },
  { id: 25, x: 0, y: -1, z: -1, colours: "----WG", accTransform: math.identity(3) },
  { id: 26, x: 1, y: -1, z: -1, colours: "---OWG", accTransform: math.identity(3) }
];

const pieceHasCoords = (piece, coords) =>
  piece.x === coords[0] &&
  piece.y === coords[1] &&
  piece.z === coords[2];

export const getPieces = (cube, coordsList) =>
  coordsList.map(coords =>
    cube.find(piece => pieceHasCoords(piece, coords)));

const isPieceInCoordsList = (piece, coordsList) =>
  coordsList.findIndex(coords => pieceHasCoords(piece, coords)) >= 0;

export const getFace = (cube, face) => {
  switch (face) {
    case C.TOP: return getTopFace(cube);
    case C.LEFT: return getLeftFace(cube);
    case C.FRONT: return getFrontFace(cube);
    case C.RIGHT: return getRightFace(cube);
    case C.BACK: return getBackFace(cube);
    case C.BOTTOM: return getBottomFace(cube);
  }
};

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
  const vector = math.matrix([piece.x, piece.y, piece.z]);
  const rotatedVector = math.multiply(vector, rotationMatrix);
  return {
    id: piece.id,
    x: rotatedVector.get([0]),
    y: rotatedVector.get([1]),
    z: rotatedVector.get([2]),
    colours: reorderColours(piece.colours, newColoursOrder),
    accTransform: math.multiply(piece.accTransform, rotationMatrix)
  };
};

const transformPieces = (cube, coordsList, transform) =>
  cube.map(piece => isPieceInCoordsList(piece, coordsList)
    ? transform(piece)
    : piece);

const NEW_COLOUR_ORDER_YAW_90 = "041235";
const NEW_COLOUR_ORDER_YAW_180 = "034125";
const NEW_COLOUR_ORDER_YAW_270 = "023415";

const NEW_COLOUR_ORDER_PITCH_90 = "410352";
const NEW_COLOUR_ORDER_PITCH_180 = "514320";
const NEW_COLOUR_ORDER_PITCH_270 = "215304";

const NEW_COLOUR_ORDER_ROLL_90 = "302541";
const NEW_COLOUR_ORDER_ROLL_180 = "532140";
const NEW_COLOUR_ORDER_ROLL_270 = "152043";

export const yawTop90 = cube =>
  transformPieces(cube, CL.topCoordsList, transform(R.Y90, NEW_COLOUR_ORDER_YAW_90));

export const yawTop180 = cube =>
  transformPieces(cube, CL.topCoordsList, transform(R.Y180, NEW_COLOUR_ORDER_YAW_180));

export const yawTop270 = cube =>
  transformPieces(cube, CL.topCoordsList, transform(R.Y270, NEW_COLOUR_ORDER_YAW_270));

export const yawMiddle90 = cube =>
  transformPieces(cube, CL.yawMiddleCoordsList, transform(R.Y90, NEW_COLOUR_ORDER_YAW_90));

export const yawMiddle270 = cube =>
  transformPieces(cube, CL.yawMiddleCoordsList, transform(R.Y270, NEW_COLOUR_ORDER_YAW_270));

export const yawBottom90 = cube =>
  transformPieces(cube, CL.bottomCoordsList, transform(R.Y90, NEW_COLOUR_ORDER_YAW_90));

export const yawBottom180 = cube =>
  transformPieces(cube, CL.bottomCoordsList, transform(R.Y180, NEW_COLOUR_ORDER_YAW_180));

export const yawBottom270 = cube =>
  transformPieces(cube, CL.bottomCoordsList, transform(R.Y270, NEW_COLOUR_ORDER_YAW_270));

export const yawTopAndMiddle90 = cube =>
  transformPieces(cube, CL.topAndMiddleCoordsList, transform(R.Y90, NEW_COLOUR_ORDER_YAW_90));

export const yawTopAndMiddle270 = cube =>
  transformPieces(cube, CL.topAndMiddleCoordsList, transform(R.Y270, NEW_COLOUR_ORDER_YAW_270));

export const yawBottomAndMiddle90 = cube =>
  transformPieces(cube, CL.bottomAndMiddleCoordsList, transform(R.Y90, NEW_COLOUR_ORDER_YAW_90));

export const yawBottomAndMiddle270 = cube =>
  transformPieces(cube, CL.bottomAndMiddleCoordsList, transform(R.Y270, NEW_COLOUR_ORDER_YAW_270));

export const yawAll90 = cube =>
  transformPieces(cube, CL.allCoordsList, transform(R.Y90, NEW_COLOUR_ORDER_YAW_90));

export const yawAll270 = cube =>
  transformPieces(cube, CL.allCoordsList, transform(R.Y270, NEW_COLOUR_ORDER_YAW_270));

export const pitchLeft90 = cube =>
  transformPieces(cube, CL.leftCoordsList, transform(R.X90, NEW_COLOUR_ORDER_PITCH_90));

export const pitchLeft180 = cube =>
  transformPieces(cube, CL.leftCoordsList, transform(R.X180, NEW_COLOUR_ORDER_PITCH_180));

export const pitchLeft270 = cube =>
  transformPieces(cube, CL.leftCoordsList, transform(R.X270, NEW_COLOUR_ORDER_PITCH_270));

export const pitchMiddle90 = cube =>
  transformPieces(cube, CL.pitchMiddleCoordsList, transform(R.X90, NEW_COLOUR_ORDER_PITCH_90));

export const pitchMiddle270 = cube =>
  transformPieces(cube, CL.pitchMiddleCoordsList, transform(R.X270, NEW_COLOUR_ORDER_PITCH_270));

export const pitchRight90 = cube =>
  transformPieces(cube, CL.rightCoordsList, transform(R.X90, NEW_COLOUR_ORDER_PITCH_90));

export const pitchRight180 = cube =>
  transformPieces(cube, CL.rightCoordsList, transform(R.X180, NEW_COLOUR_ORDER_PITCH_180));

export const pitchRight270 = cube =>
  transformPieces(cube, CL.rightCoordsList, transform(R.X270, NEW_COLOUR_ORDER_PITCH_270));

export const pitchLeftAndMiddle90 = cube =>
  transformPieces(cube, CL.leftAndMiddleCoordsList, transform(R.X90, NEW_COLOUR_ORDER_PITCH_90));

export const pitchLeftAndMiddle270 = cube =>
  transformPieces(cube, CL.leftAndMiddleCoordsList, transform(R.X270, NEW_COLOUR_ORDER_PITCH_270));

export const pitchRightAndMiddle90 = cube =>
  transformPieces(cube, CL.rightAndMiddleCoordsList, transform(R.X90, NEW_COLOUR_ORDER_PITCH_90));

export const pitchRightAndMiddle270 = cube =>
  transformPieces(cube, CL.rightAndMiddleCoordsList, transform(R.X270, NEW_COLOUR_ORDER_PITCH_270));

export const pitchAll90 = cube =>
  transformPieces(cube, CL.allCoordsList, transform(R.X90, NEW_COLOUR_ORDER_PITCH_90));

export const pitchAll270 = cube =>
  transformPieces(cube, CL.allCoordsList, transform(R.X270, NEW_COLOUR_ORDER_PITCH_270));

export const rollFront90 = cube =>
  transformPieces(cube, CL.frontCoordsList, transform(R.Z90, NEW_COLOUR_ORDER_ROLL_90));

export const rollFront180 = cube =>
  transformPieces(cube, CL.frontCoordsList, transform(R.Z180, NEW_COLOUR_ORDER_ROLL_180));

export const rollFront270 = cube =>
  transformPieces(cube, CL.frontCoordsList, transform(R.Z270, NEW_COLOUR_ORDER_ROLL_270));

export const rollMiddle90 = cube =>
  transformPieces(cube, CL.rollMiddleCoordsList, transform(R.Z90, NEW_COLOUR_ORDER_ROLL_90));

export const rollMiddle270 = cube =>
  transformPieces(cube, CL.rollMiddleCoordsList, transform(R.Z270, NEW_COLOUR_ORDER_ROLL_270));

export const rollBack90 = cube =>
  transformPieces(cube, CL.backCoordsList, transform(R.Z90, NEW_COLOUR_ORDER_ROLL_90));

export const rollBack180 = cube =>
  transformPieces(cube, CL.backCoordsList, transform(R.Z180, NEW_COLOUR_ORDER_ROLL_180));

export const rollBack270 = cube =>
  transformPieces(cube, CL.backCoordsList, transform(R.Z270, NEW_COLOUR_ORDER_ROLL_270));

export const rollFrontAndMiddle90 = cube =>
  transformPieces(cube, CL.frontAndMiddleCoordsList, transform(R.Z90, NEW_COLOUR_ORDER_ROLL_90));

export const rollFrontAndMiddle270 = cube =>
  transformPieces(cube, CL.frontAndMiddleCoordsList, transform(R.Z270, NEW_COLOUR_ORDER_ROLL_270));

export const rollBackAndMiddle90 = cube =>
  transformPieces(cube, CL.backAndMiddleCoordsList, transform(R.Z90, NEW_COLOUR_ORDER_ROLL_90));

export const rollBackAndMiddle270 = cube =>
  transformPieces(cube, CL.backAndMiddleCoordsList, transform(R.Z270, NEW_COLOUR_ORDER_ROLL_270));

export const rollAll90 = cube =>
  transformPieces(cube, CL.allCoordsList, transform(R.Z90, NEW_COLOUR_ORDER_ROLL_90));

export const rollAll270 = cube =>
  transformPieces(cube, CL.allCoordsList, transform(R.Z270, NEW_COLOUR_ORDER_ROLL_270));

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
];

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

export const randomMove = () => {
  const randomIndex = Math.floor(Math.random() * MOVES.length);
  return MOVES[randomIndex];
};

class Node {
  constructor(cube, move, parent, g, h) {
    this.cube = cube;
    this.move = move;
    this.parent = parent;
    this.g = g;
    this.h = h;
    this.f = g + h;
  }
}

const heuristic = cube => {

  const faceCount = (face, colour) =>
    getFace(cube, face).filter(ch => ch === colour).length;

  const counts = [
    faceCount(C.TOP, "B"),
    faceCount(C.LEFT, "R"),
    faceCount(C.FRONT, "Y"),
    faceCount(C.RIGHT, "O"),
    faceCount(C.BACK, "W"),
    faceCount(C.BOTTOM, "G")
  ];
  const total = counts.reduce((a, b) => a + b, 0);
  return (9 * 6) - total;
};

export const areCubesSame = (cube1, cube2) => {
  const s1 = JSON.stringify(cube1);
  const s2 = JSON.stringify(cube2);
  return s1 === s2;
};

const minBy = (set, fn) => {
  let currentMin = null;
  set.forEach(element => {
    const value = fn(element);
    if (currentMin) {
      if (value < currentMin.value) {
        currentMin.element = element;
        currentMin.value = value;
      }
    }
    else {
      currentMin = { element, value };
    }
  });
  return currentMin ? currentMin.element : null;
};

const aStar = openSet => {

  const seenCubes = [];

  const isCubeInOpenSet = cube =>
    !!Array.from(openSet.values()).find(element => areCubesSame(element.cube, cube));

  const isCubeInSeenCubes = cube =>
    !!seenCubes.find(element => areCubesSame(element, cube));

  while (openSet.size) {
    const currentNode = minBy(openSet, el => el.f);
    if (areCubesSame(currentNode.cube, solvedCube)) {
      return currentNode;
    }
    else {
      openSet.delete(currentNode);
      if (!isCubeInSeenCubes(currentNode.cube)) {
        seenCubes.push(currentNode.cube);
      }

      const nextCubes = MOVES.map(move => [move(currentNode.cube), move])
        .filter(([cube]) => !isCubeInOpenSet(cube))
        .filter(([cube]) => !isCubeInSeenCubes(cube));

      const nextNodes = nextCubes.map(([cube, move]) => {
        const g = 0;
        const h = heuristic(cube);
        return new Node(cube, move, currentNode, g, h);
      });

      nextNodes.forEach(nextNode => openSet.add(nextNode));
    }
  }

  return null;
};

const forEachNode = (node, fn) => {
  fn(node);
  const parent = node.parent;
  parent && forEachNode(parent, fn);
};

const rootNodeToSolution = rootNode => {
  const moves = [];
  forEachNode(rootNode, node => node.move && moves.push(node.move));
  return moves;
};

export const solve = shuffledCube => {
  const initialNode = new Node(shuffledCube, null, null, 0, 0);
  const openSet = new Set([initialNode]);
  const rootNode = aStar(openSet);
  return rootNode ? rootNodeToSolution(rootNode).reverse() : null;
};

export const makeMoves = (initialCube, moves, display = false) => {
  const finalCube = moves.reduce(
    (cube, move) => {
      display && (dumpCube(cube), console.log());
      return move(cube);
    },
    initialCube);
  display && dumpCube(finalCube);
  return finalCube;
};
