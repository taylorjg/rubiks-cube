import * as U from './utils'

export const CUBE_SIZE = 3
export const HALF_CUBE_SIZE = Math.floor(CUBE_SIZE / 2)
export const VALUES = U.range(CUBE_SIZE)
  .map(v => v - HALF_CUBE_SIZE)
  .map(v => CUBE_SIZE % 2 === 0 && v >= 0 ? v + 1 : v)
export const VMIN = Math.min(...VALUES)
export const VMAX = Math.max(...VALUES)

function* allCoordsGenerator() {
  const isFace = v => v === VMIN || v === VMAX
  for (const x of VALUES) {
    for (const y of VALUES) {
      for (const z of VALUES) {
        if (isFace(x) || isFace(y) || isFace(z)) {
          yield [x, y, z]
        }
      }
    }
  }
}

export const allCoordsList = Array.from(allCoordsGenerator())

export const pitchSliceCoordsList = xSlice => allCoordsList.filter(([x]) => x === xSlice)
export const yawSliceCoordsList = ySlice => allCoordsList.filter(([, y]) => y === ySlice)
export const rollSliceCoordsList = zSlice => allCoordsList.filter(([, , z]) => z === zSlice)
