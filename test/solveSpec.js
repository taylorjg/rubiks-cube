import { expect } from 'chai';
import { solve, solvedCube } from '../solving/index';
import * as S from '../solving/index';

describe("solve tests", () => {

  const confirmSolution = (shuffledCube, solution) => {
    expect(solution).not.to.be.null;
    const finalCube = S.makeMoves(shuffledCube, solution);
    expect(S.areCubesSame(finalCube, solvedCube)).to.be.true;
  };

  it("zero moves", () => {
    const moves = [];
    const shuffledCube = S.makeMoves(solvedCube, moves);
    const solution = solve(shuffledCube);
    confirmSolution(shuffledCube, solution);
  });

  it("one move", () => {
    const moves = [
      S.yawTop90
    ];
    const shuffledCube = S.makeMoves(solvedCube, moves);
    const solution = solve(shuffledCube);
    confirmSolution(shuffledCube, solution);
  });

  it("two moves", () => {
    const moves = [
      S.yawTop90,
      S.rollFront180
    ];
    const shuffledCube = S.makeMoves(solvedCube, moves);
    const solution = solve(shuffledCube);
    confirmSolution(shuffledCube, solution);
  });

  it("three moves", () => {
    const moves = [
      S.yawTop90,
      S.rollFront180,
      S.pitchLeft90
    ];
    const shuffledCube = S.makeMoves(solvedCube, moves);
    const solution = solve(shuffledCube);
    confirmSolution(shuffledCube, solution);
  });

  it("four moves", () => {
    const moves = [
      S.yawTop90,
      S.rollFront180,
      S.pitchLeft90,
      S.yawMiddle90
    ];
    const shuffledCube = S.makeMoves(solvedCube, moves);
    const solution = solve(shuffledCube);
    confirmSolution(shuffledCube, solution);
  });
});
