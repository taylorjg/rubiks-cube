import { expect } from 'chai';
import { solve, solvedCube } from '../index';
import * as R from '../index';

describe("solve tests", () => {

  const confirmSolution = (shuffledCube, solution) => {
    expect(solution).not.to.be.null;
    const finalCube = R.makeMoves(shuffledCube, solution);
    expect(R.areCubesSame(finalCube, solvedCube)).to.be.true;
  };

  it("zero moves", () => {
    const moves = [];
    const shuffledCube = R.makeMoves(solvedCube, moves);
    const solution = solve(shuffledCube);
    confirmSolution(shuffledCube, solution);
  });

  it("one move", () => {
    const moves = [
      R.yawTop90
    ];
    const shuffledCube = R.makeMoves(solvedCube, moves);
    const solution = solve(shuffledCube);
    confirmSolution(shuffledCube, solution);
  });

  it("two moves", () => {
    const moves = [
      R.yawTop90,
      R.rollFront180
    ];
    const shuffledCube = R.makeMoves(solvedCube, moves);
    const solution = solve(shuffledCube);
    confirmSolution(shuffledCube, solution);
  });

  it("three moves", () => {
    const moves = [
      R.yawTop90,
      R.rollFront180,
      R.pitchLeft90
    ];
    const shuffledCube = R.makeMoves(solvedCube, moves);
    const solution = solve(shuffledCube);
    confirmSolution(shuffledCube, solution);
  });

  it("four moves", () => {
    const moves = [
      R.yawTop90,
      R.rollFront180,
      R.pitchLeft90,
      R.yawMiddle90
    ];
    const shuffledCube = R.makeMoves(solvedCube, moves);
    const solution = solve(shuffledCube);
    confirmSolution(shuffledCube, solution);
  });
});
