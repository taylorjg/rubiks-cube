function* allCoordsGenerator() {
  const values = [-1, 0, 1]
  for (const x of values) {
    for (const y of values) {
      for (const z of values) {
        if (x || y || z) {
          yield [x, y, z]
        }
      }
    }
  }
}

export const allCoordsList = Array.from(allCoordsGenerator())

export const leftCoordsList = allCoordsList.filter(([x]) => x === -1)
export const rightCoordsList = allCoordsList.filter(([x]) => x === 1)

export const topCoordsList = allCoordsList.filter(([, y]) => y === 1)
export const bottomCoordsList = allCoordsList.filter(([, y]) => y === -1)

export const frontCoordsList = allCoordsList.filter(([, , z]) => z === 1)
export const backCoordsList = allCoordsList.filter(([, , z]) => z === -1)

export const pitchMiddleCoordsList = allCoordsList.filter(([x]) => x === 0)
export const yawMiddleCoordsList = allCoordsList.filter(([, y]) => y === 0)
export const rollMiddleCoordsList = allCoordsList.filter(([, , z]) => z === 0)

export const leftAndMiddleCoordsList = leftCoordsList.concat(pitchMiddleCoordsList)
export const rightAndMiddleCoordsList = rightCoordsList.concat(pitchMiddleCoordsList)

export const topAndMiddleCoordsList = topCoordsList.concat(yawMiddleCoordsList)
export const bottomAndMiddleCoordsList = bottomCoordsList.concat(yawMiddleCoordsList)

export const frontAndMiddleCoordsList = frontCoordsList.concat(rollMiddleCoordsList)
export const backAndMiddleCoordsList = backCoordsList.concat(rollMiddleCoordsList)
