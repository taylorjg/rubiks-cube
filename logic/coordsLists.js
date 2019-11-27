import * as U from './utils'

// Currently, only odd numbers work.
export const CUBE_SIZE = 3

export const HALF_CUBE_SIZE = Math.floor(CUBE_SIZE / 2)
export const VMIN = -HALF_CUBE_SIZE
export const VMAX = +HALF_CUBE_SIZE
export const VMID = 0

function* allCoordsGenerator() {
  const values = U.range(CUBE_SIZE).map(v => v - HALF_CUBE_SIZE)
  const isFace = v => v === VMIN || v === VMAX
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

export const allCoordsList = Array.from(allCoordsGenerator())

export const leftCoordsList = allCoordsList.filter(([x]) => x === VMIN)
export const rightCoordsList = allCoordsList.filter(([x]) => x === VMAX)

export const topCoordsList = allCoordsList.filter(([, y]) => y === VMAX)
export const bottomCoordsList = allCoordsList.filter(([, y]) => y === VMIN)

export const frontCoordsList = allCoordsList.filter(([, , z]) => z === VMAX)
export const backCoordsList = allCoordsList.filter(([, , z]) => z === VMIN)

export const pitchMiddleCoordsList = allCoordsList.filter(([x]) => x === VMID)
export const yawMiddleCoordsList = allCoordsList.filter(([, y]) => y === VMID)
export const rollMiddleCoordsList = allCoordsList.filter(([, , z]) => z === VMID)

export const leftAndMiddleCoordsList = leftCoordsList.concat(pitchMiddleCoordsList)
export const rightAndMiddleCoordsList = rightCoordsList.concat(pitchMiddleCoordsList)

export const topAndMiddleCoordsList = topCoordsList.concat(yawMiddleCoordsList)
export const bottomAndMiddleCoordsList = bottomCoordsList.concat(yawMiddleCoordsList)

export const frontAndMiddleCoordsList = frontCoordsList.concat(rollMiddleCoordsList)
export const backAndMiddleCoordsList = backCoordsList.concat(rollMiddleCoordsList)
