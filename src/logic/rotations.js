import { matrix, identity } from 'mathjs'

export const Identity = identity(3)

const calcCosSin = degrees => {
  const radians = degrees * Math.PI / 180
  const cos = Math.trunc(Math.cos(radians))
  const sin = Math.trunc(Math.sin(radians))
  return { cos, sin }
}

export const makeXRotation = degrees => {
  const { cos, sin } = calcCosSin(degrees)
  return matrix([
    [1, 0, 0],
    [0, cos, sin],
    [0, -sin, cos]
  ])
}

export const makeYRotation = degrees => {
  const { cos, sin } = calcCosSin(degrees)
  return matrix([
    [cos, 0, -sin],
    [0, 1, 0],
    [sin, 0, cos]
  ])
}

export const makeZRotation = degrees => {
  const { cos, sin } = calcCosSin(degrees)
  return matrix([
    [cos, -sin, 0],
    [sin, cos, 0],
    [0, 0, 1]
  ])
}
