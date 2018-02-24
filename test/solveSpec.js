import { expect } from 'chai';
import { solve, solvedCube } from '../index';
import * as R from '../index';

describe("solve tests", () => {

  const shuffleCube = moves =>
    moves.reduce((cube, move) => move(cube), solvedCube);

  it("zero moves", () => {
    const shuffledCube = shuffleCube([]);
    const result = solve(shuffledCube);
    expect(result).not.to.be.null;
    expect(R.areCubesSame(result.cube, solvedCube)).to.be.true;
    expect(result.parent).to.be.null;
  });

  it("one move", () => {
    const shuffledCube = shuffleCube([R.yawTop90]);
    const result = solve(shuffledCube);
    expect(result).not.to.be.null;
    expect(R.areCubesSame(result.cube, solvedCube)).to.be.true;
    expect(result.parent).not.to.be.null;
    expect(result.move).to.equal(R.yawTop270);
  });

  it("two moves", () => {
    const shuffledCube = shuffleCube([R.yawTop90, R.rollFront180]);
    const result = solve(shuffledCube);
    expect(result).not.to.be.null;
    expect(result.parent).not.to.be.null;
    expect(R.areCubesSame(result.cube, solvedCube)).to.be.true;
  });

  it("three moves", () => {
    const shuffledCube = shuffleCube([R.yawTop90, R.rollFront180, R.pitchLeft90]);
    const result = solve(shuffledCube);
    expect(result).not.to.be.null;
    expect(result.parent).not.to.be.null;
    expect(R.areCubesSame(result.cube, solvedCube)).to.be.true;
  });
});
