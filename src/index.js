import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import { PieceGeometry } from './PieceGeometry'
import * as L from '../logic'

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

const PIECE_SIZE = 1
const NUM_SEGMENTS = 12
const MARGIN = 0.05

const pieceMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  vertexColors: THREE.FaceColors
})

const createUiPiece = piece => {

  const setFaceColour = (face, colours, coloursIndex) => {
    const ch = colours[coloursIndex]
    face.color = COLOUR_TABLE[ch !== '-' ? ch : 'H']
  }

  const geometry = new PieceGeometry(PIECE_SIZE, NUM_SEGMENTS, MARGIN)
  const uiPiece = new THREE.Mesh(geometry, pieceMaterial)
  uiPiece.userData = piece.id

  uiPiece.geometry.faces.forEach(face => {
    const closeTo = (a, b) => Math.abs(a - b) <= 1e-12
    closeTo(face.normal.x, 1) && setFaceColour(face, piece.colours, L.RIGHT)
    closeTo(face.normal.x, -1) && setFaceColour(face, piece.colours, L.LEFT)
    closeTo(face.normal.y, 1) && setFaceColour(face, piece.colours, L.TOP)
    closeTo(face.normal.y, -1) && setFaceColour(face, piece.colours, L.BOTTOM)
    closeTo(face.normal.z, 1) && setFaceColour(face, piece.colours, L.FRONT)
    closeTo(face.normal.z, -1) && setFaceColour(face, piece.colours, L.BACK)
  })

  resetUiPiece(uiPiece, piece)

  return uiPiece
}

const resetUiPiece = (uiPiece, piece) => {
  uiPiece.position.x = piece.x
  uiPiece.position.y = piece.y
  uiPiece.position.z = piece.z
  uiPiece.setRotationFromMatrix(makeRotationMatrix4(piece.accTransform3))
}

const findUiPiece = piece =>
  puzzleGroup.children.find(child => child.userData === piece.id)

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

const displayCube = cube => {
  cube.forEach(piece => {
    const uiPiece = findUiPiece(piece)
    resetUiPiece(uiPiece, piece)
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

  const moveData = L.MOVE_DATA.get(move)
  const pieces = L.getPieces(cube, moveData.coordsList)
  const uiPieces = pieces.map(findUiPiece)
  puzzleGroup.remove(...uiPieces)
  const sliceGroup = new THREE.Group()
  sliceGroup.add(...uiPieces)
  scene.add(sliceGroup)

  const numTurns = moveData.numTurns
  const animationSpeedPerTurn = ANIMATION_SPEED_PER_TURN_MS / 1000
  const t0 = 0
  const t1 = numTurns * animationSpeedPerTurn
  const times = [t0, t1]
  const values = []
  const startQuaternion = new THREE.Quaternion()
  const endQuaternion = new THREE.Quaternion()
  const rotationMatrix3 = moveData.rotationMatrix3
  const rotationMatrix4 = makeRotationMatrix4(rotationMatrix3)
  endQuaternion.setFromRotationMatrix(rotationMatrix4)
  startQuaternion.toArray(values, values.length)
  endQuaternion.toArray(values, values.length)
  const duration = -1
  const tracks = [new THREE.QuaternionKeyframeTrack('.quaternion', times, values)]
  const clip = new THREE.AnimationClip(move, duration, tracks)

  const clipAction = mixer.clipAction(clip, sliceGroup)
  clipAction.setLoop(THREE.LoopOnce)

  const onFinished = () => {
    mixer.removeEventListener('finished', onFinished)
    sliceGroup.remove(...uiPieces)
    scene.remove(sliceGroup)
    puzzleGroup.add(...uiPieces)
    cube = moveData.makeMove(cube)
    for (const uiPiece of uiPieces) {
      uiPiece.applyMatrix(rotationMatrix4)
    }
    setTimeout(animateMoves, DELAY_BETWEEN_MOVES_MS, moves, nextMoveIndex + 1)
  }

  mixer.addEventListener('finished', onFinished)
  clipAction.play()
}

const showSolutionByCheating = randomMoves => {
  const solutionMoves = randomMoves
    .map(move => L.MOVE_DATA.get(move).oppositeMove)
    .reverse()
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

  cube = randomMoves.reduce(
    (accCube, move) => {
      const moveData = L.MOVE_DATA.get(move)
      return moveData.makeMove(accCube)
    },
    L.SOLVED_CUBE)

  displayCube(cube)

  setTimeout(showSolutionByCheating, DELAY_BEFORE_SOLVING_MS, randomMoves)
}

document.getElementById('btnScramble')
  .addEventListener('click', scramble)

scramble()
