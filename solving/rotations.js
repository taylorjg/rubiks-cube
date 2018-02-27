import { matrix } from 'mathjs';

export const X90 = matrix([
  [1, 0, 0],
  [0, 0, 1],
  [0, -1, 0]
]);

export const X180 = matrix([
  [1, 0, 0],
  [0, -1, 0],
  [0, 0, -1]
]);

export const X270 = matrix([
  [1, 0, 0],
  [0, 0, -1],
  [0, 1, 0]
]);

export const Y90 = matrix([
  [0, 0, -1],
  [0, 1, 0],
  [1, 0, 0]
]);

export const Y180 = matrix([
  [-1, 0, 0],
  [0, 1, 0],
  [0, 0, -1]
]);

export const Y270 = matrix([
  [0, 0, 1],
  [0, 1, 0],
  [-1, 0, 0]
]);

export const Z90 = matrix([
  [0, 1, 0],
  [-1, 0, 0],
  [0, 0, 1]
]);

export const Z180 = matrix([
  [-1, 0, 0],
  [0, -1, 0],
  [0, 0, 1]
]);

export const Z270 = matrix([
  [0, -1, 0],
  [1, 0, 0],
  [0, 0, 1]
]);
