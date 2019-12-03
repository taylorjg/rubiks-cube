import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import { PieceGeometry } from './PieceGeometry'
import * as L from '../logic'
import * as U from '../logic/utils'
import { CUBE_SIZE } from '../logic/coordsLists'

const url = new URL(document.location)
const searchParams = url.searchParams

const queryParamInt = (paramName, defaultValue, min, max) => {
  const clamp = v => {
    const localMin = min !== undefined ? min : Number.MIN_SAFE_INTEGER
    const localMax = max !== undefined ? max : Number.MAX_SAFE_INTEGER
    return Math.max(localMin, Math.min(localMax, v))
  }
  if (!searchParams.has(paramName)) return clamp(defaultValue)
  const valueString = searchParams.get(paramName)
  const valueInteger = Number(valueString)
  const value = Number.isInteger(valueInteger) ? valueInteger : defaultValue
  return clamp(value)
}

const COLOUR_TABLE = {
  'U': new THREE.Color('blue'),
  'L': new THREE.Color('red'),
  'F': new THREE.Color('yellow'),
  'R': new THREE.Color('darkorange'),
  'B': new THREE.Color('ghostwhite'),
  'D': new THREE.Color('green'),
  '-': new THREE.Color('black')
}

const PIECE_SIZE = 1
const NUM_SEGMENTS = 1
const MARGIN = 0.05
const DELAY_MS = queryParamInt('delay', 1000, 0, 5000)
const SPEED_MILLISECONDS = queryParamInt('speed', 750, 100, 1000)
const NUM_RANDOM_MOVES = queryParamInt('moves', 25, 0, 1000)
const AXES_ENABLED = searchParams.has('axes')

const PIECE_MATERIAL = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  vertexColors: THREE.FaceColors
})

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

const createUiPiece = piece => {

  const setFaceColour = (face, colours, coloursIndex) => {
    const ch = colours[coloursIndex]
    face.color = COLOUR_TABLE[ch]
  }

  const closeTo = (a, b) => Math.abs(a - b) <= 1e-12

  const geometry = new PieceGeometry(PIECE_SIZE, NUM_SEGMENTS, MARGIN)
  const uiPiece = new THREE.Mesh(geometry, PIECE_MATERIAL)
  uiPiece.userData = piece.id

  uiPiece.geometry.faces.forEach(face => {
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
  const isEvenSizedCube = CUBE_SIZE % 2 === 0
  const adjustValue = v => isEvenSizedCube ? v < 0 ? v + 0.5 : v - 0.5 : v
  uiPiece.position.x = adjustValue(piece.x)
  uiPiece.position.y = adjustValue(piece.y)
  uiPiece.position.z = adjustValue(piece.z)
  uiPiece.setRotationFromMatrix(makeRotationMatrix4(piece.accTransform3))
}

const findUiPiece = piece =>
  globals.puzzleGroup.children.find(child => child.userData === piece.id)

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
  if (uiPieces.length) {
    fromGroup.remove(...uiPieces)
    toGroup.add(...uiPieces)
  }
}

const createAnimationClip = move => {
  const numTurns = move.numTurns
  const t0 = 0
  const t1 = numTurns * (SPEED_MILLISECONDS / 1000)
  const times = [t0, t1]
  const values = []
  const startQuaternion = new THREE.Quaternion()
  const endQuaternion = new THREE.Quaternion()
  const rotationMatrix3 = move.rotationMatrix3
  const rotationMatrix4 = makeRotationMatrix4(rotationMatrix3)
  endQuaternion.setFromRotationMatrix(rotationMatrix4)
  startQuaternion.toArray(values, values.length)
  endQuaternion.toArray(values, values.length)
  const duration = -1
  const tracks = [new THREE.QuaternionKeyframeTrack('.quaternion', times, values)]
  return new THREE.AnimationClip(move.id, duration, tracks)
}

const animateMoves = (moves, nextMoveIndex = 0) => {

  const move = moves[nextMoveIndex]

  if (!move) {
    enableScrambleButton()
    return
  }

  const pieces = L.getPieces(globals.cube, move.coordsList)
  const uiPieces = pieces.map(findUiPiece)
  movePiecesBetweenGroups(uiPieces, globals.puzzleGroup, globals.animationGroup)

  const onFinished = () => {
    globals.animationMixer.removeEventListener('finished', onFinished)
    movePiecesBetweenGroups(uiPieces, globals.animationGroup, globals.puzzleGroup)
    globals.cube = move.makeMove(globals.cube)
    const rotationMatrix3 = move.rotationMatrix3
    const rotationMatrix4 = makeRotationMatrix4(rotationMatrix3)
    for (const uiPiece of uiPieces) {
      uiPiece.applyMatrix(rotationMatrix4)
    }
    setTimeout(animateMoves, SPEED_MILLISECONDS, moves, nextMoveIndex + 1)
  }

  globals.animationMixer.addEventListener('finished', onFinished)

  const animationClip = createAnimationClip(move)
  const clipAction = globals.animationMixer.clipAction(
    animationClip,
    globals.animationGroup)
  clipAction.setLoop(THREE.LoopOnce)
  clipAction.play()
}

const showSolutionByCheating = randomMoves => {
  const solutionMoves = randomMoves
    .map(move => move.oppositeMoveId)
    .map(L.lookupMoveId)
    .reverse()
  console.log(`solution moves: ${solutionMoves.map(move => move.id).join(' ')}`)
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
  const randomMoves = U.range(NUM_RANDOM_MOVES).map(L.getRandomMove)
  L.removeRedundantMoves(randomMoves)
  console.log(`random moves: ${randomMoves.map(move => move.id).join(' ')}`)
  globals.cube = L.makeMoves(randomMoves)
  resetUiPieces(globals.cube)
  setTimeout(showSolutionByCheating, DELAY_MS, randomMoves)
}

const init = () => {

  document.getElementById('btnScramble').addEventListener('click', scramble)

  const container = document.getElementById('container')
  const w = container.offsetWidth
  const h = container.offsetHeight
  globals.renderer = new THREE.WebGLRenderer({ antialias: true })
  globals.renderer.setSize(w, h)
  container.appendChild(globals.renderer.domElement)

  window.addEventListener('resize', () => {
    globals.renderer.setSize(container.offsetWidth, container.offsetHeight)
    globals.camera.aspect = container.offsetWidth / container.offsetHeight
    globals.camera.updateProjectionMatrix()
  })

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

  if (AXES_ENABLED) {
    const axesHelper = new THREE.AxesHelper(5)
    globals.scene.add(axesHelper)
  }

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
