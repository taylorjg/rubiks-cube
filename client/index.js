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

const CUBE_SIZE = 0.94;

const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  vertexColors: THREE.FaceColors
});

const makeKey = piece =>
  `${piece.x}:${piece.y}:${piece.z}:${piece.colours}`;

const setFaceColour = (piece, face, coloursIndex) => {
  const ch = piece.colours[coloursIndex];
  face.color = COLOUR_TABLE[ch !== "-" ? ch : "H"];
};

const createUPiece = piece => {

  const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);

  geometry.faces.forEach(face => {
    face.normal.x === 1 && setFaceColour(piece, face, C.RIGHT);
    face.normal.x === -1 && setFaceColour(piece, face, C.LEFT);
    face.normal.y === 1 && setFaceColour(piece, face, C.TOP);
    face.normal.y === -1 && setFaceColour(piece, face, C.BOTTOM);
    face.normal.z === 1 && setFaceColour(piece, face, C.FRONT);
    face.normal.z === -1 && setFaceColour(piece, face, C.BACK);
  });

  const uiPiece = new THREE.Mesh(geometry, material);

  uiPiece.position.x = piece.x;
  uiPiece.position.y = piece.y;
  uiPiece.position.z = piece.z;

  uiPiece.userData = {
    id: piece.id,
    key: makeKey(piece)
  };

  return uiPiece;
};

const updateUiPiece = (piece, uiPiece, r) => {

  uiPiece.position.x = piece.x;
  uiPiece.position.y = piece.y;
  uiPiece.position.z = piece.z;

  const geometry = uiPiece.geometry;
  geometry.faces.forEach(face => {
    face.normal.x === 1 && setFaceColour(piece, face, C.RIGHT);
    face.normal.x === -1 && setFaceColour(piece, face, C.LEFT);
    face.normal.y === 1 && setFaceColour(piece, face, C.TOP);
    face.normal.y === -1 && setFaceColour(piece, face, C.BOTTOM);
    face.normal.z === 1 && setFaceColour(piece, face, C.FRONT);
    face.normal.z === -1 && setFaceColour(piece, face, C.BACK);
  });

  const m = new THREE.Matrix4().set(
    r.get([0, 0]), r.get([1, 0]), r.get([2, 0]), 0,
    r.get([0, 1]), r.get([1, 1]), r.get([2, 1]), 0,
    r.get([0, 2]), r.get([1, 2]), r.get([2, 2]), 0,
    0, 0, 0, 1);

  uiPiece.setRotationFromMatrix(m);

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

// const moves = [
//   S.yawBottom270,
//   S.pitchLeft180,
//   S.rollBack180,
//   S.pitchLeft90,
//   S.rollMiddle270,
//   S.yawBottom180,
//   S.yawTop270,
//   S.pitchRight90
// ];
// const shuffledCube = S.makeMoves(S.solvedCube, moves);
// shuffledCube.forEach(piece => mainGroup.add(createPiece(piece)));

const renderCube = (cube, r) => {
  cube.forEach(piece => {
    const uiPiece = findUiPiece(piece);
    if (uiPiece) {
      const key = makeKey(piece);
      if (uiPiece.userData.key !== key) {
        updateUiPiece(piece, uiPiece, r);
      }
    }
    else {
      mainGroup.add(createUPiece(piece));
    }
  });
};

const animate = () => {
  window.requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

renderCube(S.solvedCube, new THREE.Matrix3());
animate();

setTimeout(
  () => {
    renderCube(S.pitchMiddle270(S.solvedCube), R.X270);
  },
  2000);
