const solvedCube = [
  // top layer
  { id: 1, x: 0, y: 2, z: 0, colours: "BRY---", orientation: "U" },
  { id: 2, x: 1, y: 2, z: 0, colours: "B-Y---", orientation: "U" },
  { id: 3, x: 2, y: 2, z: 0, colours: "B-YO--", orientation: "U" },
  { id: 4, x: 0, y: 2, z: 1, colours: "BR----", orientation: "U" },
  { id: 5, x: 1, y: 2, z: 1, colours: "B-----", orientation: "U" },
  { id: 6, x: 2, y: 2, z: 1, colours: "B--O--", orientation: "U" },
  { id: 7, x: 0, y: 2, z: 2, colours: "BR--W-", orientation: "U" },
  { id: 8, x: 1, y: 2, z: 2, colours: "B---W-", orientation: "U" },
  { id: 9, x: 2, y: 2, z: 2, colours: "B--OW-", orientation: "U" },

  // middle layer
  { id: 10, x: 0, y: 1, z: 0, colours: "-RY---", orientation: "U" },
  { id: 11, x: 1, y: 1, z: 0, colours: "--Y---", orientation: "U" },
  { id: 12, x: 2, y: 1, z: 0, colours: "--YO--", orientation: "U" },
  { id: 13, x: 0, y: 1, z: 1, colours: "-R----", orientation: "U" },
  { id: 14, x: 1, y: 1, z: 1, colours: "------", orientation: "U" },
  { id: 15, x: 2, y: 1, z: 1, colours: "---O--", orientation: "U" },
  { id: 16, x: 0, y: 1, z: 2, colours: "-R--W-", orientation: "U" },
  { id: 17, x: 1, y: 1, z: 2, colours: "----W-", orientation: "U" },
  { id: 18, x: 2, y: 1, z: 2, colours: "---OW-", orientation: "U" },

  // bottom layer
  { id: 19, x: 0, y: 0, z: 0, colours: "-RY--G", orientation: "U" },
  { id: 20, x: 1, y: 0, z: 0, colours: "--Y--G", orientation: "U" },
  { id: 21, x: 2, y: 0, z: 0, colours: "--YO-G", orientation: "U" },
  { id: 22, x: 0, y: 0, z: 1, colours: "-R---G", orientation: "U" },
  { id: 23, x: 1, y: 0, z: 1, colours: "-----G", orientation: "U" },
  { id: 24, x: 2, y: 0, z: 1, colours: "---O-G", orientation: "U" },
  { id: 25, x: 0, y: 0, z: 2, colours: "-R--WG", orientation: "U" },
  { id: 26, x: 1, y: 0, z: 2, colours: "----WG", orientation: "U" },
  { id: 27, x: 2, y: 0, z: 2, colours: "---OWG", orientation: "U" }
];

const getPieces = (cube, coordsList) =>
  coordsList.map(coords =>
    cube.find(piece =>
      piece.x === coords[0] &&
      piece.y === coords[1] &&
      piece.z === coords[2]));

const top = cube => {
  const coordsList = [
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
  const pieces = getPieces(cube, coordsList);
  return pieces.map(piece => piece.colours[0]);
};

const left = cube => {
  const coordsList = [
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
  const pieces = getPieces(cube, coordsList);
  return pieces.map(piece => piece.colours[1]);
};

const front = cube => {
  const coordsList = [
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
  const pieces = getPieces(cube, coordsList);
  return pieces.map(piece => piece.colours[2]);
};

const right = cube => {
  const coordsList = [
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
  const pieces = getPieces(cube, coordsList);
  return pieces.map(piece => piece.colours[3]);
};

const back = cube => {
  const coordsList = [
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
  const pieces = getPieces(cube, coordsList);
  return pieces.map(piece => piece.colours[4]);
};

const bottom = cube => {
  const coordsList = [
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
  const pieces = getPieces(cube, coordsList);
  return pieces.map(piece => piece.colours[5]);
};

const dumpCube = cube => {

  const topFace = top(cube);
  const leftFace = left(cube);
  const frontFace = front(cube);
  const rightFace = right(cube);
  const backFace = back(cube);
  const bottomFace = bottom(cube);

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
