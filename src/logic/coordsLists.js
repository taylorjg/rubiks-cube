import * as U from './utils'

export const getCubeDimensions = cubeSize => {
  const isEvenSizedCube = cubeSize % 2 === 0
  const HALF_CUBE_SIZE = Math.floor(cubeSize / 2)
  const values = U.range(cubeSize)
    .map(v => v - HALF_CUBE_SIZE)
    .map(v => isEvenSizedCube && v >= 0 ? v + 1 : v)
  const vmin = Math.min(...values)
  const vmax = Math.max(...values)
  return { values, vmin, vmax, isEvenSizedCube }
}

function* allCoordsGenerator(cubeSize) {
  const { values, vmin, vmax } = getCubeDimensions(cubeSize)
  const isFace = v => v === vmin || v === vmax
  for (const x of values) {
    for (const y of values) {
      for (const z of values) {
        if (isFace(x) || isFace(y) || isFace(z)) {
          yield [x, y, z]
        }
      }
    }
  }
}

export const makeAllCoordsList = cubeSize => Array.from(allCoordsGenerator(cubeSize))

export const pitchSliceCoordsList = (allCoordsList, xSlice) => allCoordsList.filter(([x]) => x === xSlice)
export const yawSliceCoordsList = (allCoordsList, ySlice) => allCoordsList.filter(([, y]) => y === ySlice)
export const rollSliceCoordsList = (allCoordsList, zSlice) => allCoordsList.filter(([, , z]) => z === zSlice)
