import * as S from '../solving';
import * as C from '../solving/constants';
import * as R from '../solving/rotations';
import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';

const COLOUR_TABLE = {
  'B': new THREE.Color('blue'),
  'R': new THREE.Color('red'),
  'Y': new THREE.Color('yellow'),
  'O': new THREE.Color('darkorange'),
  'W': new THREE.Color('ghostwhite'),
  'G': new THREE.Color('green'),
  'H': new THREE.Color('black')
};

// 'r' is a mathjs 3x3 rotation matrix.
const makeRotationMatrix4 = r =>
  new THREE.Matrix4().set(
    r.get([0, 0]), r.get([1, 0]), r.get([2, 0]), 0,
    r.get([0, 1]), r.get([1, 1]), r.get([2, 1]), 0,
    r.get([0, 2]), r.get([1, 2]), r.get([2, 2]), 0,
    0, 0, 0, 1);

const ROTATION_MATRICES = {
  [S.yawTop90]: makeRotationMatrix4(R.Y90),
  [S.yawTop180]: makeRotationMatrix4(R.Y180),
  [S.yawTop270]: makeRotationMatrix4(R.Y270),
  [S.yawMiddle90]: makeRotationMatrix4(R.Y90),
  [S.yawMiddle180]: makeRotationMatrix4(R.Y180),
  [S.yawMiddle270]: makeRotationMatrix4(R.Y270),
  [S.yawBottom90]: makeRotationMatrix4(R.Y90),
  [S.yawBottom180]: makeRotationMatrix4(R.Y180),
  [S.yawBottom270]: makeRotationMatrix4(R.Y270),

  [S.pitchLeft90]: makeRotationMatrix4(R.X90),
  [S.pitchLeft180]: makeRotationMatrix4(R.X180),
  [S.pitchLeft270]: makeRotationMatrix4(R.X270),
  [S.pitchMiddle90]: makeRotationMatrix4(R.X90),
  [S.pitchMiddle180]: makeRotationMatrix4(R.X180),
  [S.pitchMiddle270]: makeRotationMatrix4(R.X270),
  [S.pitchRight90]: makeRotationMatrix4(R.X90),
  [S.pitchRight180]: makeRotationMatrix4(R.X180),
  [S.pitchRight270]: makeRotationMatrix4(R.X270),

  [S.rollFront90]: makeRotationMatrix4(R.Z90),
  [S.rollFront180]: makeRotationMatrix4(R.Z180),
  [S.rollFront270]: makeRotationMatrix4(R.Z270),
  [S.rollMiddle90]: makeRotationMatrix4(R.Z90),
  [S.rollMiddle180]: makeRotationMatrix4(R.Z180),
  [S.rollMiddle270]: makeRotationMatrix4(R.Z270),
  [S.rollBack90]: makeRotationMatrix4(R.Z90),
  [S.rollBack180]: makeRotationMatrix4(R.Z180),
  [S.rollBack270]: makeRotationMatrix4(R.Z270)
};

const PIECE_SIZE = 0.94;

const pieceMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  vertexColors: THREE.FaceColors
});

const makeKey = piece =>
  `${piece.x}:${piece.y}:${piece.z}:${piece.colours}`;

const createUiPiece = (piece, move) => {

  const setFaceColour = (face, colours, coloursIndex) => {
    const ch = colours[coloursIndex];
    face.color = COLOUR_TABLE[ch !== "-" ? ch : "H"];
  };

  const geometry = new THREE.BoxGeometry(PIECE_SIZE, PIECE_SIZE, PIECE_SIZE);
  const uiPiece = new THREE.Mesh(geometry, pieceMaterial);

  updateUiPiece(piece, uiPiece, move);

  uiPiece.geometry.faces.forEach(face => {
    face.normal.x === 1 && setFaceColour(face, piece.colours, C.RIGHT);
    face.normal.x === -1 && setFaceColour(face, piece.colours, C.LEFT);
    face.normal.y === 1 && setFaceColour(face, piece.colours, C.TOP);
    face.normal.y === -1 && setFaceColour(face, piece.colours, C.BOTTOM);
    face.normal.z === 1 && setFaceColour(face, piece.colours, C.FRONT);
    face.normal.z === -1 && setFaceColour(face, piece.colours, C.BACK);
  });
  
  return uiPiece;
};

const updateUiPiece = (piece, uiPiece, move) => {

  uiPiece.position.x = piece.x;
  uiPiece.position.y = piece.y;
  uiPiece.position.z = piece.z;

  if (move) {
    uiPiece.applyMatrix(ROTATION_MATRICES[move]);
  }
  else {
    uiPiece.setRotationFromMatrix(new THREE.Matrix4());
  }

  uiPiece.userData = {
    id: piece.id,
    key: makeKey(piece)
  };
};

const findUiPiece = piece =>
  mainGroup.children.find(child => child.userData.id === piece.id);

const container = document.getElementById('container');
const w = container.offsetWidth;
const h = container.offsetHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, w / h, 1, 100);
camera.position.set(3.45, 7.35, 9.40);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
light1.position.set(0, 0, 10);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xffffff, 0.8);
light2.position.set(0, 0, -10);
scene.add(light2);

const light3 = new THREE.DirectionalLight(0xffffff, 0.8);
light3.position.set(0, 10, 0);
scene.add(light3);

const light4 = new THREE.DirectionalLight(0xffffff, 0.4);
light4.position.set(0, -10, 0);
scene.add(light4);

const light5 = new THREE.DirectionalLight(0xffffff, 0.4);
light5.position.set(10, 0, 0);
scene.add(light5);

const light6 = new THREE.DirectionalLight(0xffffff, 0.4);
light6.position.set(-10, 0, 0);
scene.add(light6);

const mainGroup = new THREE.Group();
scene.add(mainGroup);

const controls = new TrackballControls(camera, renderer.domElement);
controls.minDistance = 5.0;
controls.maxDistance = 40.0;
controls.noPan = true;

window.addEventListener('resize', () => {
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
});

const renderCube = (cube, move) => {
  cube.forEach(piece => {
    const uiPiece = findUiPiece(piece);
    if (uiPiece) {
      const key = makeKey(piece);
      if (uiPiece.userData.key !== key) {
        updateUiPiece(piece, uiPiece, move);
      }
    }
    else {
      mainGroup.add(createUiPiece(piece, move));
    }
  });
};

const animate = () => {
  window.requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();

let cube = S.solvedCube;

renderCube(cube);

const resetCube = () => {
  cube = S.solvedCube;
  renderCube(cube);
};

setInterval(
  () => {
    const randomIndex = Math.floor(Math.random() * S.MOVES.length);
    const move = S.MOVES[randomIndex];
    cube = move(cube);
    renderCube(cube, move);
  },
  1000);

document.getElementById("btnReset")
  .addEventListener("click", resetCube);
