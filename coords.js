export class Coords {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(other) {
    return new Coords(
      this.x + other.x,
      this.y + other.y,
      this.z + other.z);
  }

  subtract(other) {
    return new Coords(
      this.x - other.x,
      this.y - other.y,
      this.z - other.z);
  }

  equals(other) {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }
}
