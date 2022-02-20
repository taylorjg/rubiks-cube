import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as L from '../logic'
import * as U from '../logic/utils'

const url = new URL(document.location)
const searchParams = url.searchParams

const queryParamInt = (paramName, min, max, defaultValue) => {
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

const COLOR_TABLE = {
  'U': new THREE.Color('blue'),
  'D': new THREE.Color('green'),
  'L': new THREE.Color('red'),
  'R': new THREE.Color('darkorange'),
  'F': new THREE.Color('yellow'),
  'B': new THREE.Color('ghostwhite'),
  '-': new THREE.Color(0x282828)
}

const CUBE_SIZE = queryParamInt('size', 2, 5, 3)
const SPEED_MILLISECONDS = queryParamInt('speed', 100, 1000, 750)
const NUM_RANDOM_MOVES = queryParamInt('moves', 10, 100, 25)
const DELAY_MS = queryParamInt('delay', 0, 5000, 1000)
const AXES_ENABLED = searchParams.has('axes')

const PIECE_MATERIAL = new THREE.MeshPhysicalMaterial({
  vertexColors: true,
  metalness: .5,
  roughness: .1,
  clearcoat: .1,
  reflectivity: .5
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

const loadGeometry = url =>
  new Promise((resolve, reject) => {
    const loader = new GLTFLoader()
    loader.load(
      url,
      gltf => {
        const bufferGeometry = gltf.scene.children[0].geometry
        resolve(bufferGeometry.toNonIndexed())
      },
      undefined,
      reject)
  })

const lookupColorForFaceNormal = (piece, normalX, normalY, normalZ) => {
  if (U.closeTo(normalY, 1)) return COLOR_TABLE[piece.faces.up]
  if (U.closeTo(normalY, -1)) return COLOR_TABLE[piece.faces.down]
  if (U.closeTo(normalX, -1)) return COLOR_TABLE[piece.faces.left]
  if (U.closeTo(normalX, 1)) return COLOR_TABLE[piece.faces.right]
  if (U.closeTo(normalZ, 1)) return COLOR_TABLE[piece.faces.front]
  if (U.closeTo(normalZ, -1)) return COLOR_TABLE[piece.faces.back]
  return COLOR_TABLE['-']
}

const setGeometryVertexColors = (piece, pieceGeometry) => {
  const clonedPieceGeoemtry = pieceGeometry.clone()
  const normalAttribute = clonedPieceGeoemtry.getAttribute('normal')

  const colors = []

  for (let normalIndex = 0; normalIndex < normalAttribute.count; normalIndex += 3) {

    let arrayIndex = normalIndex * normalAttribute.itemSize
    const normalX = normalAttribute.array[arrayIndex++]
    const normalY = normalAttribute.array[arrayIndex++]
    const normalZ = normalAttribute.array[arrayIndex++]

    const color = lookupColorForFaceNormal(piece, normalX, normalY, normalZ)

    colors.push(color.r, color.g, color.b)
    colors.push(color.r, color.g, color.b)
    colors.push(color.r, color.g, color.b)
  }

  clonedPieceGeoemtry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

  return clonedPieceGeoemtry
}

const createUiPieces = (cube, pieceGeometry) => {
  cube.forEach(piece => {
    const uiPiece = createUiPiece(piece, pieceGeometry)
    globals.puzzleGroup.add(uiPiece)
  })
}

const createUiPiece = (piece, pieceGeometry) => {
  const pieceGeometryWithColors = setGeometryVertexColors(piece, pieceGeometry)
  const uiPiece = new THREE.Mesh(pieceGeometryWithColors, PIECE_MATERIAL)
  uiPiece.scale.set(0.5, 0.5, 0.5)
  uiPiece.userData = piece.id
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
    return setTimeout(scramble, 2000)
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
      uiPiece.applyMatrix4(rotationMatrix4)
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
    .map(id => L.lookupMoveId(CUBE_SIZE, id))
    .reverse()
  console.log(`solution moves: ${solutionMoves.map(move => move.id).join(' ')}`)
  animateMoves(solutionMoves)
}

const scramble = () => {
  const randomMoves = U.range(NUM_RANDOM_MOVES).map(() => L.getRandomMove(CUBE_SIZE))
  L.removeRedundantMoves(randomMoves)
  console.log(`random moves: ${randomMoves.map(move => move.id).join(' ')}`)
  globals.cube = L.makeMoves(randomMoves, L.getSolvedCube(CUBE_SIZE))
  resetUiPieces(globals.cube)
  setTimeout(showSolutionByCheating, DELAY_MS, randomMoves)
}

const init = async () => {

  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('service-worker.js')
      console.log('Successfully registered service worker', registration)
    } catch (error) {
      console.error(`Failed to register service worker: ${error.message}`)
    }
  }

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
  globals.scene.background = new THREE.Color(0x000000)
  globals.camera = new THREE.PerspectiveCamera(34, w / h, 1, 100)
  globals.camera.position.set(3, 3, 12)
  globals.camera.lookAt(new THREE.Vector3(0, 0, 0))
  globals.scene.add(globals.camera)

  const LIGHT_COLOR = 0xffffff
  const LIGHT_INTENSITY = 2
  const LIGHT_DISTANCE = 4

  const light1 = new THREE.DirectionalLight(LIGHT_COLOR, LIGHT_INTENSITY)
  light1.position.set(0, 0, LIGHT_DISTANCE)
  globals.scene.add(light1)

  const light2 = new THREE.DirectionalLight(LIGHT_COLOR, LIGHT_INTENSITY)
  light2.position.set(0, 0, -LIGHT_DISTANCE)
  globals.scene.add(light2)

  const light3 = new THREE.DirectionalLight(LIGHT_COLOR, LIGHT_INTENSITY)
  light3.position.set(0, LIGHT_DISTANCE, 0)
  globals.scene.add(light3)

  const light4 = new THREE.DirectionalLight(LIGHT_COLOR, LIGHT_INTENSITY)
  light4.position.set(0, -LIGHT_DISTANCE, 0)
  globals.scene.add(light4)

  const light5 = new THREE.DirectionalLight(LIGHT_COLOR, LIGHT_INTENSITY)
  light5.position.set(LIGHT_DISTANCE, 0, 0)
  globals.scene.add(light5)

  const light6 = new THREE.DirectionalLight(LIGHT_COLOR, LIGHT_INTENSITY)
  light6.position.set(-LIGHT_DISTANCE, 0, 0)
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

  globals.cube = L.getSolvedCube(CUBE_SIZE)
  const pieceGeometry = await loadGeometry('cube-bevelled.glb')
  createUiPieces(globals.cube, pieceGeometry)

  animate()
  scramble()
}

init()
