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

const PIECE_SIZE = 1
const NUM_SEGMENTS = 12
const MARGIN = 0.05

const ANIMATION_SPEED_PER_TURN_MS = 750
const DELAY_BETWEEN_MOVES_MS = 500
const DELAY_BEFORE_SOLVING_MS = 2000

const globals = {
  cube: undefined,
  renderer: undefined,
  camera: undefined,
  scene: undefined,
  puzzleGroup: undefined,
  animationGroup: undefined,
  controls: undefined,
  clock: undefined,
  animationMixer: undefined
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

const PIECE_MATERIAL = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  vertexColors: THREE.FaceColors
})

const createUiPiece = piece => {

  const setFaceColour = (face, colours, coloursIndex) => {
    const ch = colours[coloursIndex]
    face.color = COLOUR_TABLE[ch !== '-' ? ch : 'H']
  }

  const geometry = new PieceGeometry(PIECE_SIZE, NUM_SEGMENTS, MARGIN)
  const uiPiece = new THREE.Mesh(geometry, PIECE_MATERIAL)
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
  globals.puzzleGroup.children.find(child => child.userData === piece.id)

window.addEventListener('resize', () => {
  const container = document.getElementById('container')
  globals.renderer.setSize(container.offsetWidth, container.offsetHeight)
  globals.camera.aspect = container.offsetWidth / container.offsetHeight
  globals.camera.updateProjectionMatrix()
})

const createUiPieces = cube => {
  cube.forEach(piece => {
    const uiPiece = createUiPiece(piece)
    globals.puzzleGroup.add(uiPiece)
  })
}

const resetUiPieces = cube => {
  cube.forEach(piece => {
    const uiPiece = findUiPiece(piece)
    resetUiPiece(uiPiece, piece)
  })
}

const animate = () => {
  window.requestAnimationFrame(animate)
  globals.controls.update()
  const delta = globals.clock.getDelta() * globals.animationMixer.timeScale
  globals.animationMixer.update(delta)
  globals.renderer.render(globals.scene, globals.camera)
}

const movePiecesBetweenGroups = (uiPieces, fromGroup, toGroup) => {
  fromGroup.remove(...uiPieces)
  toGroup.add(...uiPieces)
}

const createAnimationClip = (move, moveData) => {
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
  return new THREE.AnimationClip(move, duration, tracks)
}

const animateMoves = (moves, nextMoveIndex = 0) => {

  const move = moves[nextMoveIndex]

  if (!move) {
    enableScrambleButton()
    return
  }

  const moveData = L.MOVE_DATA.get(move)
  const pieces = L.getPieces(globals.cube, moveData.coordsList)
  const uiPieces = pieces.map(findUiPiece)
  movePiecesBetweenGroups(uiPieces, globals.puzzleGroup, globals.animationGroup)

  const onFinished = () => {
    globals.animationMixer.removeEventListener('finished', onFinished)
    movePiecesBetweenGroups(uiPieces, globals.animationGroup, globals.puzzleGroup)
    globals.cube = moveData.makeMove(globals.cube)
    const rotationMatrix3 = moveData.rotationMatrix3
    const rotationMatrix4 = makeRotationMatrix4(rotationMatrix3)
    for (const uiPiece of uiPieces) {
      uiPiece.applyMatrix(rotationMatrix4)
    }
    setTimeout(animateMoves, DELAY_BETWEEN_MOVES_MS, moves, nextMoveIndex + 1)
  }

  globals.animationMixer.addEventListener('finished', onFinished)

  const animationClip = createAnimationClip(move, moveData)
  const clipAction = globals.animationMixer.clipAction(
    animationClip,
    globals.animationGroup)
  clipAction.setLoop(THREE.LoopOnce)
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

  globals.cube = randomMoves.reduce(
    (accCube, move) => {
      const moveData = L.MOVE_DATA.get(move)
      return moveData.makeMove(accCube)
    },
    L.SOLVED_CUBE)

  resetUiPieces(globals.cube)

  setTimeout(showSolutionByCheating, DELAY_BEFORE_SOLVING_MS, randomMoves)
}

const init = () => {

  document.getElementById('btnScramble').addEventListener('click', scramble)

  const container = document.getElementById('container')
  const w = container.offsetWidth
  const h = container.offsetHeight
  globals.renderer = new THREE.WebGLRenderer({ antialias: true })
  globals.renderer.setSize(w, h)
  container.appendChild(globals.renderer.domElement)

  globals.scene = new THREE.Scene()
  globals.camera = new THREE.PerspectiveCamera(34, w / h, 1, 100)
  globals.camera.position.set(3.45, 7.35, 9.40)
  globals.camera.lookAt(new THREE.Vector3(0, 0, 0))
  globals.scene.add(globals.camera)

  const light1 = new THREE.DirectionalLight(0xffffff, 0.8)
  light1.position.set(0, 0, 10)
  globals.scene.add(light1)

  const light2 = new THREE.DirectionalLight(0xffffff, 0.8)
  light2.position.set(0, 0, -10)
  globals.scene.add(light2)

  const light3 = new THREE.DirectionalLight(0xffffff, 0.8)
  light3.position.set(0, 10, 0)
  globals.scene.add(light3)

  const light4 = new THREE.DirectionalLight(0xffffff, 0.4)
  light4.position.set(0, -10, 0)
  globals.scene.add(light4)

  const light5 = new THREE.DirectionalLight(0xffffff, 0.4)
  light5.position.set(10, 0, 0)
  globals.scene.add(light5)

  const light6 = new THREE.DirectionalLight(0xffffff, 0.4)
  light6.position.set(-10, 0, 0)
  globals.scene.add(light6)

  globals.puzzleGroup = new THREE.Group()
  globals.scene.add(globals.puzzleGroup)

  globals.animationGroup = new THREE.Group()
  globals.scene.add(globals.animationGroup)

  globals.controls = new OrbitControls(globals.camera, globals.renderer.domElement)
  globals.controls.minDistance = 5.0
  globals.controls.maxDistance = 40.0
  globals.controls.enableDamping = true
  globals.controls.dampingFactor = 0.9
  globals.controls.autoRotate = true
  globals.controls.autoRotateSpeed = 1.0

  globals.clock = new THREE.Clock()
  globals.animationMixer = new THREE.AnimationMixer()

  globals.cube = L.SOLVED_CUBE
  createUiPieces(globals.cube)

  animate()
  scramble()
}

init()
