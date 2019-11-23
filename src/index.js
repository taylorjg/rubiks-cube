import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import { PieceGeometry } from './PieceGeometry'
import * as L from '../logic'
import * as C from '../logic/constants'
import * as R from '../logic/rotations'
import * as CL from '../logic/coordsLists'

const COLOUR_TABLE = {
  'B': new THREE.Color('blue'),
  'R': new THREE.Color('red'),
  'Y': new THREE.Color('yellow'),
  'O': new THREE.Color('darkorange'),
  'W': new THREE.Color('ghostwhite'),
  'G': new THREE.Color('green'),
  'H': new THREE.Color('black') // H for hidden
}

const makeRotationMatrix4 = rotationMatrix3 => {
  const n11 = rotationMatrix3.get([0, 0])
  const n12 = rotationMatrix3.get([1, 0])
  const n13 = rotationMatrix3.get([2, 0])
  const n21 = rotationMatrix3.get([0, 1])
  const n22 = rotationMatrix3.get([1, 1])
  const n23 = rotationMatrix3.get([2, 1])
  const n31 = rotationMatrix3.get([0, 2])
  const n32 = rotationMatrix3.get([1, 2])
  const n33 = rotationMatrix3.get([2, 2])
  return new THREE.Matrix4().set(
    n11, n12, n13, 0,
    n21, n22, n23, 0,
    n31, n32, n33, 0,
    0, 0, 0, 1)
}

const ROTATION_MATRICES = new Map([
  [L.yawTop90, makeRotationMatrix4(R.Y90)],
  [L.yawTop180, makeRotationMatrix4(R.Y180)],
  [L.yawTop270, makeRotationMatrix4(R.Y270)],
  [L.yawMiddle90, makeRotationMatrix4(R.Y90)],
  [L.yawMiddle270, makeRotationMatrix4(R.Y270)],
  [L.yawBottom90, makeRotationMatrix4(R.Y90)],
  [L.yawBottom180, makeRotationMatrix4(R.Y180)],
  [L.yawBottom270, makeRotationMatrix4(R.Y270)],
  [L.yawTopAndMiddle90, makeRotationMatrix4(R.Y90)],
  [L.yawTopAndMiddle270, makeRotationMatrix4(R.Y270)],
  [L.yawBottomAndMiddle90, makeRotationMatrix4(R.Y90)],
  [L.yawBottomAndMiddle270, makeRotationMatrix4(R.Y270)],
  [L.yawAll90, makeRotationMatrix4(R.Y90)],
  [L.yawAll270, makeRotationMatrix4(R.Y270)],

  [L.pitchLeft90, makeRotationMatrix4(R.X90)],
  [L.pitchLeft180, makeRotationMatrix4(R.X180)],
  [L.pitchLeft270, makeRotationMatrix4(R.X270)],
  [L.pitchMiddle90, makeRotationMatrix4(R.X90)],
  [L.pitchMiddle270, makeRotationMatrix4(R.X270)],
  [L.pitchRight90, makeRotationMatrix4(R.X90)],
  [L.pitchRight180, makeRotationMatrix4(R.X180)],
  [L.pitchRight270, makeRotationMatrix4(R.X270)],
  [L.pitchLeftAndMiddle90, makeRotationMatrix4(R.X90)],
  [L.pitchLeftAndMiddle270, makeRotationMatrix4(R.X270)],
  [L.pitchRightAndMiddle90, makeRotationMatrix4(R.X90)],
  [L.pitchRightAndMiddle270, makeRotationMatrix4(R.X270)],
  [L.pitchAll90, makeRotationMatrix4(R.X90)],
  [L.pitchAll270, makeRotationMatrix4(R.X270)],

  [L.rollFront90, makeRotationMatrix4(R.Z90)],
  [L.rollFront180, makeRotationMatrix4(R.Z180)],
  [L.rollFront270, makeRotationMatrix4(R.Z270)],
  [L.rollMiddle90, makeRotationMatrix4(R.Z90)],
  [L.rollMiddle270, makeRotationMatrix4(R.Z270)],
  [L.rollBack90, makeRotationMatrix4(R.Z90)],
  [L.rollBack180, makeRotationMatrix4(R.Z180)],
  [L.rollBack270, makeRotationMatrix4(R.Z270)],
  [L.rollFrontAndMiddle90, makeRotationMatrix4(R.Z90)],
  [L.rollFrontAndMiddle270, makeRotationMatrix4(R.Z270)],
  [L.rollBackAndMiddle90, makeRotationMatrix4(R.Z90)],
  [L.rollBackAndMiddle270, makeRotationMatrix4(R.Z270)],
  [L.rollAll90, makeRotationMatrix4(R.Z90)],
  [L.rollAll270, makeRotationMatrix4(R.Z270)]
])

// QC = Quaternion Constant
// I can't remember how I calculated this to be Math.sqrt(2) / 2
const QC = Math.sqrt(2) / 2

const END_QUATERNIONS = new Map([
  [L.yawTop90, new THREE.Quaternion(0, QC, 0, QC)],
  [L.yawMiddle90, new THREE.Quaternion(0, QC, 0, QC)],
  [L.yawBottom90, new THREE.Quaternion(0, QC, 0, QC)],
  [L.yawTopAndMiddle90, new THREE.Quaternion(0, QC, 0, QC)],
  [L.yawBottomAndMiddle90, new THREE.Quaternion(0, QC, 0, QC)],
  [L.yawAll90, new THREE.Quaternion(0, QC, 0, QC)],

  [L.yawTop180, new THREE.Quaternion(0, 1, 0, 0)],
  [L.yawBottom180, new THREE.Quaternion(0, 1, 0, 0)],

  [L.yawTop270, new THREE.Quaternion(0, -QC, 0, QC)],
  [L.yawMiddle270, new THREE.Quaternion(0, -QC, 0, QC)],
  [L.yawBottom270, new THREE.Quaternion(0, -QC, 0, QC)],
  [L.yawTopAndMiddle270, new THREE.Quaternion(0, -QC, 0, QC)],
  [L.yawBottomAndMiddle270, new THREE.Quaternion(0, -QC, 0, QC)],
  [L.yawAll270, new THREE.Quaternion(0, -QC, 0, QC)],

  [L.pitchLeft90, new THREE.Quaternion(QC, 0, 0, QC)],
  [L.pitchMiddle90, new THREE.Quaternion(QC, 0, 0, QC)],
  [L.pitchRight90, new THREE.Quaternion(QC, 0, 0, QC)],
  [L.pitchLeftAndMiddle90, new THREE.Quaternion(QC, 0, 0, QC)],
  [L.pitchRightAndMiddle90, new THREE.Quaternion(QC, 0, 0, QC)],
  [L.pitchAll90, new THREE.Quaternion(QC, 0, 0, QC)],

  [L.pitchLeft180, new THREE.Quaternion(1, 0, 0, 0)],
  [L.pitchRight180, new THREE.Quaternion(1, 0, 0, 0)],

  [L.pitchLeft270, new THREE.Quaternion(-QC, 0, 0, QC)],
  [L.pitchMiddle270, new THREE.Quaternion(-QC, 0, 0, QC)],
  [L.pitchRight270, new THREE.Quaternion(-QC, 0, 0, QC)],
  [L.pitchLeftAndMiddle270, new THREE.Quaternion(-QC, 0, 0, QC)],
  [L.pitchRightAndMiddle270, new THREE.Quaternion(-QC, 0, 0, QC)],
  [L.pitchAll270, new THREE.Quaternion(-QC, 0, 0, QC)],

  [L.rollFront90, new THREE.Quaternion(0, 0, QC, QC)],
  [L.rollMiddle90, new THREE.Quaternion(0, 0, QC, QC)],
  [L.rollBack90, new THREE.Quaternion(0, 0, QC, QC)],
  [L.rollFrontAndMiddle90, new THREE.Quaternion(0, 0, QC, QC)],
  [L.rollBackAndMiddle90, new THREE.Quaternion(0, 0, QC, QC)],
  [L.rollAll90, new THREE.Quaternion(0, 0, QC, QC)],

  [L.rollFront180, new THREE.Quaternion(0, 0, 1, 0)],
  [L.rollBack180, new THREE.Quaternion(0, 0, 1, 0)],

  [L.rollFront270, new THREE.Quaternion(0, 0, -QC, QC)],
  [L.rollMiddle270, new THREE.Quaternion(0, 0, -QC, QC)],
  [L.rollBack270, new THREE.Quaternion(0, 0, -QC, QC)],
  [L.rollFrontAndMiddle270, new THREE.Quaternion(0, 0, -QC, QC)],
  [L.rollBackAndMiddle270, new THREE.Quaternion(0, 0, -QC, QC)],
  [L.rollAll270, new THREE.Quaternion(0, 0, -QC, QC)]
])

const COORDS_LIST = new Map([
  [L.yawTop90, CL.topCoordsList],
  [L.yawTop180, CL.topCoordsList],
  [L.yawTop270, CL.topCoordsList],
  [L.yawMiddle90, CL.yawMiddleCoordsList],
  [L.yawMiddle270, CL.yawMiddleCoordsList],
  [L.yawBottom90, CL.bottomCoordsList],
  [L.yawBottom180, CL.bottomCoordsList],
  [L.yawBottom270, CL.bottomCoordsList],
  [L.yawTopAndMiddle90, CL.topAndMiddleCoordsList],
  [L.yawTopAndMiddle270, CL.topAndMiddleCoordsList],
  [L.yawBottomAndMiddle90, CL.bottomAndMiddleCoordsList],
  [L.yawBottomAndMiddle270, CL.bottomAndMiddleCoordsList],
  [L.yawAll90, CL.allCoordsList],
  [L.yawAll270, CL.allCoordsList],

  [L.pitchLeft90, CL.leftCoordsList],
  [L.pitchLeft180, CL.leftCoordsList],
  [L.pitchLeft270, CL.leftCoordsList],
  [L.pitchMiddle90, CL.pitchMiddleCoordsList],
  [L.pitchMiddle270, CL.pitchMiddleCoordsList],
  [L.pitchRight90, CL.rightCoordsList],
  [L.pitchRight180, CL.rightCoordsList],
  [L.pitchRight270, CL.rightCoordsList],
  [L.pitchLeftAndMiddle90, CL.leftAndMiddleCoordsList],
  [L.pitchLeftAndMiddle270, CL.leftAndMiddleCoordsList],
  [L.pitchRightAndMiddle90, CL.rightAndMiddleCoordsList],
  [L.pitchRightAndMiddle270, CL.rightAndMiddleCoordsList],
  [L.pitchAll90, CL.allCoordsList],
  [L.pitchAll270, CL.allCoordsList],

  [L.rollFront90, CL.frontCoordsList],
  [L.rollFront180, CL.frontCoordsList],
  [L.rollFront270, CL.frontCoordsList],
  [L.rollMiddle90, CL.rollMiddleCoordsList],
  [L.rollMiddle270, CL.rollMiddleCoordsList],
  [L.rollBack90, CL.backCoordsList],
  [L.rollBack180, CL.backCoordsList],
  [L.rollBack270, CL.backCoordsList],
  [L.rollFrontAndMiddle90, CL.frontAndMiddleCoordsList],
  [L.rollFrontAndMiddle270, CL.frontAndMiddleCoordsList],
  [L.rollBackAndMiddle90, CL.backAndMiddleCoordsList],
  [L.rollBackAndMiddle270, CL.backAndMiddleCoordsList],
  [L.rollAll90, CL.allCoordsList],
  [L.rollAll270, CL.allCoordsList]
])

const NUM_TURNS = new Map([
  [L.yawTop90, 1],
  [L.yawTop180, 2],
  [L.yawTop270, 1],
  [L.yawMiddle90, 1],
  [L.yawMiddle270, 1],
  [L.yawBottom90, 1],
  [L.yawBottom180, 2],
  [L.yawBottom270, 1],
  [L.yawTopAndMiddle90, 1],
  [L.yawTopAndMiddle270, 1],
  [L.yawBottomAndMiddle90, 1],
  [L.yawBottomAndMiddle270, 1],
  [L.yawAll90, 1],
  [L.yawAll270, 1],

  [L.pitchLeft90, 1],
  [L.pitchLeft180, 2],
  [L.pitchLeft270, 1],
  [L.pitchMiddle90, 1],
  [L.pitchMiddle270, 1],
  [L.pitchRight90, 1],
  [L.pitchRight180, 2],
  [L.pitchRight270, 1],
  [L.pitchLeftAndMiddle90, 1],
  [L.pitchLeftAndMiddle270, 1],
  [L.pitchRightAndMiddle90, 1],
  [L.pitchRightAndMiddle270, 1],
  [L.pitchAll90, 1],
  [L.pitchAll270, 1],

  [L.rollFront90, 1],
  [L.rollFront180, 2],
  [L.rollFront270, 1],
  [L.rollMiddle90, 1],
  [L.rollMiddle270, 1],
  [L.rollBack90, 1],
  [L.rollBack180, 2],
  [L.rollBack270, 1],
  [L.rollFrontAndMiddle90, 1],
  [L.rollFrontAndMiddle270, 1],
  [L.rollBackAndMiddle90, 1],
  [L.rollBackAndMiddle270, 1],
  [L.rollAll90, 1],
  [L.rollAll270, 1]
])

const PIECE_SIZE = 1
const NUM_SEGMENTS = 12
const MARGIN = 0.05

const pieceMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  vertexColors: THREE.FaceColors
})

const makeKey = piece => `${piece.x}:${piece.y}:${piece.z}`

const createUiPiece = piece => {

  const setFaceColour = (face, colours, coloursIndex) => {
    const ch = colours[coloursIndex]
    face.color = COLOUR_TABLE[ch !== '-' ? ch : 'H']
  }

  const geometry = new PieceGeometry(PIECE_SIZE, NUM_SEGMENTS, MARGIN)
  const uiPiece = new THREE.Mesh(geometry, pieceMaterial)

  uiPiece.geometry.faces.forEach(face => {
    const closeTo = (a, b) => Math.abs(a - b) <= 1e-12
    closeTo(face.normal.x, 1) && setFaceColour(face, piece.colours, C.RIGHT)
    closeTo(face.normal.x, -1) && setFaceColour(face, piece.colours, C.LEFT)
    closeTo(face.normal.y, 1) && setFaceColour(face, piece.colours, C.TOP)
    closeTo(face.normal.y, -1) && setFaceColour(face, piece.colours, C.BOTTOM)
    closeTo(face.normal.z, 1) && setFaceColour(face, piece.colours, C.FRONT)
    closeTo(face.normal.z, -1) && setFaceColour(face, piece.colours, C.BACK)
  })

  resetUiPiece(uiPiece, piece)

  return uiPiece
}

const resetUiPiece = (uiPiece, piece) => {
  uiPiece.position.x = piece.x
  uiPiece.position.y = piece.y
  uiPiece.position.z = piece.z
  uiPiece.setRotationFromMatrix(makeRotationMatrix4(piece.accTransform3))
  uiPiece.userData = {
    id: piece.id,
    key: makeKey(piece)
  }
}

const updateUiPiece = (uiPiece, piece, move) => {
  uiPiece.applyMatrix(ROTATION_MATRICES.get(move))
  uiPiece.userData = {
    id: piece.id,
    key: makeKey(piece)
  }
}

const findUiPiece = piece =>
  puzzleGroup.children.find(child => child.userData.id === piece.id)

const container = document.getElementById('container')
const w = container.offsetWidth
const h = container.offsetHeight
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(w, h)
container.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(34, w / h, 1, 100)
camera.position.set(3.45, 7.35, 9.40)
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera)

const light1 = new THREE.DirectionalLight(0xffffff, 0.8)
light1.position.set(0, 0, 10)
scene.add(light1)

const light2 = new THREE.DirectionalLight(0xffffff, 0.8)
light2.position.set(0, 0, -10)
scene.add(light2)

const light3 = new THREE.DirectionalLight(0xffffff, 0.8)
light3.position.set(0, 10, 0)
scene.add(light3)

const light4 = new THREE.DirectionalLight(0xffffff, 0.4)
light4.position.set(0, -10, 0)
scene.add(light4)

const light5 = new THREE.DirectionalLight(0xffffff, 0.4)
light5.position.set(10, 0, 0)
scene.add(light5)

const light6 = new THREE.DirectionalLight(0xffffff, 0.4)
light6.position.set(-10, 0, 0)
scene.add(light6)

const puzzleGroup = new THREE.Group()
scene.add(puzzleGroup)

const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 5.0
controls.maxDistance = 40.0
controls.enableDamping = true
controls.dampingFactor = 0.9
controls.autoRotate = true
controls.autoRotateSpeed = 1.0

window.addEventListener('resize', () => {
  renderer.setSize(container.offsetWidth, container.offsetHeight)
  camera.aspect = container.offsetWidth / container.offsetHeight
  camera.updateProjectionMatrix()
})

const createCube = cube => {
  cube.forEach(piece => puzzleGroup.add(createUiPiece(piece)))
}

const resetCube = cube => {
  cube.forEach(piece => {
    const uiPiece = findUiPiece(piece)
    resetUiPiece(uiPiece, piece)
  })
}

const renderCubeMove = (cube, move) => {
  cube.forEach(piece => {
    const uiPiece = findUiPiece(piece)
    const key = makeKey(piece)
    if (uiPiece.userData.key !== key) {
      updateUiPiece(uiPiece, piece, move)
    }
  })
}

const clock = new THREE.Clock()
const mixer = new THREE.AnimationMixer()

const animate = () => {
  window.requestAnimationFrame(animate)
  controls.update()
  const delta = clock.getDelta() * mixer.timeScale
  mixer.update(delta)
  renderer.render(scene, camera)
}

let cube = L.SOLVED_CUBE
createCube(cube)

animate()

const ANIMATION_SPEED_PER_TURN_MS = 750
const DELAY_BETWEEN_MOVES_MS = 500
const DELAY_BEFORE_SOLVING_MS = 2000

const animateMoves = (moves, nextMoveIndex = 0) => {

  const move = moves[nextMoveIndex]

  if (!move) {
    enableScrambleButton()
    return
  }

  const pieces = L.getPieces(cube, COORDS_LIST.get(move))
  const uiPieces = pieces.map(findUiPiece)
  puzzleGroup.remove(...uiPieces)
  const sliceGroup = new THREE.Group()
  sliceGroup.add(...uiPieces)
  scene.add(sliceGroup)

  const numTurns = NUM_TURNS.get(move)
  const animationSpeedPerTurn = ANIMATION_SPEED_PER_TURN_MS / 1000
  const t0 = 0
  const t1 = numTurns * animationSpeedPerTurn
  const times = [t0, t1]
  const values = []
  const startQuaternion = new THREE.Quaternion()
  const endQuaternion = END_QUATERNIONS.get(move)
  startQuaternion.toArray(values, values.length)
  endQuaternion.toArray(values, values.length)
  const clip = new THREE.AnimationClip(
    move.name,
    -1,
    [new THREE.QuaternionKeyframeTrack('.quaternion', times, values)])

  const clipAction = mixer.clipAction(clip, sliceGroup)
  clipAction.setLoop(THREE.LoopOnce)

  const onFinished = () => {
    mixer.removeEventListener('finished', onFinished)
    sliceGroup.remove(...uiPieces)
    scene.remove(sliceGroup)
    puzzleGroup.add(...uiPieces)
    cube = move(cube)
    renderCubeMove(cube, move)
    setTimeout(animateMoves, DELAY_BETWEEN_MOVES_MS, moves, nextMoveIndex + 1)
  }

  mixer.addEventListener('finished', onFinished)
  clipAction.play()
}

const solveByCheating = randomMoves => {
  const solutionMoves = randomMoves.map(move => L.OPPOSITE_MOVES.get(move)).reverse()
  animateMoves(solutionMoves)
}

const enableScrambleButton = () => {
  const element = document.getElementById('btnScramble')
  element.disabled = false
  element.focus()
}

const disableScrambleButton = () =>
  document.getElementById('btnScramble').disabled = true

const scramble = () => {

  disableScrambleButton()

  const numRandomMoves = 25 + Math.floor(Math.random() * 25)
  const randomMoves = Array.from(Array(numRandomMoves).keys()).map(L.randomMove)
  L.removeRedundantMoves(randomMoves)

  cube = randomMoves.reduce((c, m) => m(c), L.SOLVED_CUBE)
  resetCube(cube)

  setTimeout(solveByCheating, DELAY_BEFORE_SOLVING_MS, randomMoves)
}

document.getElementById('btnScramble')
  .addEventListener('click', scramble)

scramble()
