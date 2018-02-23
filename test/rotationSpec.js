import { expect } from 'chai';
import { solvedCube } from '../index';
import * as R from '../index';

describe("rotation tests", () => {

  it("no rotation", () => {
    expect(R.getTopFace(solvedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(R.getLeftFace(solvedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(R.getFrontFace(solvedCube)).to.deep.equal(Array.from("YYYYYYYYY"));
    expect(R.getRightFace(solvedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(R.getBackFace(solvedCube)).to.deep.equal(Array.from("WWWWWWWWW"));
    expect(R.getBottomFace(solvedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawTop90", () => {
    const rotatedCube = R.yawTop90(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("YYYRRRRRR"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("OOOYYYYYY"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("WWWOOOOOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("RRRWWWWWW"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });
});
