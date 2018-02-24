import { expect } from 'chai';
import { solve, solvedCube } from '../index';
import * as R from '../index';

describe("solve tests", () => {

  it("already solved", () => {
    const result = solve(solvedCube);
    expect(result).not.to.be.null;
    expect(result.cube).to.deep.equal(solvedCube);
    expect(result.parent).to.be.null;
  });

  it("one move", () => {
    const shuffledCube = R.yawTop90(solvedCube);
    const result = solve(shuffledCube);
    expect(result).not.to.be.null;
    expect(result.cube).to.deep.equal(solvedCube);
    expect(result.parent).not.to.be.null;
    expect(result.move).to.equal(R.yawTop270);
  });
});
