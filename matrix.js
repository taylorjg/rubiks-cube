import { Coords } from './coords';

export class Matrix {
  constructor(
    a1, a2, a3,
    b1, b2, b3,
    c1, c2, c3
  ) {
    this.a1 = a1;
    this.a2 = a2;
    this.a3 = a3;
    this.b1 = b1;
    this.b2 = b2;
    this.b3 = b3;
    this.c1 = c1;
    this.c2 = c2;
    this.c3 = c3;
  }

  multiplyMatrix(other) {
    return new Matrix(
      this.a1 * other.a1 + this.a2 * other.b1 + this.a3 * other.c1,
      this.a1 * other.a2 + this.a2 * other.b2 + this.a3 * other.c2,
      this.a1 * other.a3 + this.a2 * other.b3 + this.a3 * other.c3,
      this.b1 * other.a1 + this.b2 * other.b1 + this.b3 * other.c1,
      this.b1 * other.a2 + this.b2 * other.b2 + this.b3 * other.c2,
      this.b1 * other.a3 + this.b2 * other.b3 + this.b3 * other.c3,
      this.c1 * other.a1 + this.c2 * other.b1 + this.c3 * other.c1,
      this.c1 * other.a2 + this.c2 * other.b2 + this.c3 * other.c2,
      this.c1 * other.a3 + this.c2 * other.b3 + this.c3 * other.c3
    );
  }

  multiplyCoords(coords) {
    return new Coords(
      this.a1 * coords.x + this.a2 * coords.y + this.a3 * coords.z,
      this.b1 * coords.x + this.b2 * coords.y + this.b3 * coords.z,
      this.c1 * coords.x + this.c2 * coords.y + this.c3 * coords.z
    );
  }
}

export const MATRIX_IDENTITY = new Matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
);

export const MATRIX_X90CW = new Matrix(
  1, 0, 0,
  0, 0, 1,
  0, -1, 0
);

export const MATRIX_X180CW = new Matrix(
  1, 0, 0,
  0, -1, 0,
  0, 0, -1
);

export const MATRIX_X270CW = new Matrix(
  1, 0, 0,
  0, 0, -1,
  0, 1, 0
);

export const MATRIX_Y90CW = new Matrix(
  0, 0, -1,
  0, 1, 0,
  1, 0, 0
);

export const MATRIX_Y180CW = new Matrix(
  -1, 0, 0,
  0, 1, 0,
  0, 0, -1
);

export const MATRIX_Y270CW = new Matrix(
  0, 0, 1,
  0, 1, 0,
  -1, 0, 0
);

export const MATRIX_Z90CW = new Matrix(
  0, 1, 0,
  -1, 0, 0,
  0, 0, 1
);

export const MATRIX_Z180CW = new Matrix(
  -1, 0, 0,
  0, -1, 0,
  0, 0, 1
);

export const MATRIX_Z270CW = new Matrix(
  0, -1, 0,
  1, 0, 0,
  0, 0, 1
);