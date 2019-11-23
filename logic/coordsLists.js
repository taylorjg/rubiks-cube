export const topCoordsList = [
  [-1, 1, -1],
  [0, 1, -1],
  [1, 1, -1],
  [-1, 1, 0],
  [0, 1, 0],
  [1, 1, 0],
  [-1, 1, 1],
  [0, 1, 1],
  [1, 1, 1]
]

export const leftCoordsList = [
  [-1, 1, -1],
  [-1, 1, 0],
  [-1, 1, 1],
  [-1, 0, -1],
  [-1, 0, 0],
  [-1, 0, 1],
  [-1, -1, -1],
  [-1, -1, 0],
  [-1, -1, 1]
]

export const frontCoordsList = [
  [-1, 1, 1],
  [0, 1, 1],
  [1, 1, 1],
  [-1, 0, 1],
  [0, 0, 1],
  [1, 0, 1],
  [-1, -1, 1],
  [0, -1, 1],
  [1, -1, 1]
]

export const rightCoordsList = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 1, -1],
  [1, 0, 1],
  [1, 0, 0],
  [1, 0, -1],
  [1, -1, 1],
  [1, -1, 0],
  [1, -1, -1]
]

export const backCoordsList = [
  [1, 1, -1],
  [0, 1, -1],
  [-1, 1, -1],
  [1, 0, -1],
  [0, 0, -1],
  [-1, 0, -1],
  [1, -1, -1],
  [0, -1, -1],
  [-1, -1, -1]
]

export const bottomCoordsList = [
  [-1, -1, 1],
  [0, -1, 1],
  [1, -1, 1],
  [-1, -1, 0],
  [0, -1, 0],
  [1, -1, 0],
  [-1, -1, -1],
  [0, -1, -1],
  [1, -1, -1]
]

export const yawMiddleCoordsList = [
  [-1, 0, 1],
  [0, 0, 1],
  [1, 0, 1],
  [-1, 0, 0],
  [1, 0, 0],
  [-1, 0, -1],
  [0, 0, -1],
  [1, 0, -1]
]

export const pitchMiddleCoordsList = [
  [0, 1, -1],
  [0, 1, 0],
  [0, 1, 1],
  [0, 0, -1],
  [0, 0, 1],
  [0, -1, -1],
  [0, -1, 0],
  [0, -1, 1]
]

export const rollMiddleCoordsList = [
  [-1, 1, 0],
  [0, 1, 0],
  [1, 1, 0],
  [-1, 0, 0],
  [1, 0, 0],
  [-1, -1, 0],
  [0, -1, 0],
  [1, -1, 0]
]

// u and u'
export const topAndMiddleCoordsList =
  topCoordsList.concat(yawMiddleCoordsList)

// l and l'
export const leftAndMiddleCoordsList =
  leftCoordsList.concat(pitchMiddleCoordsList)

// f and f'
export const frontAndMiddleCoordsList =
  frontCoordsList.concat(rollMiddleCoordsList)

// r and r'
export const rightAndMiddleCoordsList =
  rightCoordsList.concat(pitchMiddleCoordsList)

// b and b'
export const backAndMiddleCoordsList =
  backCoordsList.concat(rollMiddleCoordsList)

// d and d'
export const bottomAndMiddleCoordsList =
  bottomCoordsList.concat(yawMiddleCoordsList)

// X, X', Y, Y', Z, Z'
export const allCoordsList =
  [].concat(
    frontCoordsList,
    rollMiddleCoordsList,
    backCoordsList
  )
