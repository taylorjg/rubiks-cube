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

  it("yawTop180", () => {
    const rotatedCube = R.yawTop180(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("OOORRRRRR"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("WWWYYYYYY"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("RRROOOOOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("YYYWWWWWW"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawTop270", () => {
    const rotatedCube = R.yawTop270(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("WWWRRRRRR"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("RRRYYYYYY"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("YYYOOOOOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("OOOWWWWWW"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawMiddle90", () => {
    const rotatedCube = R.yawMiddle90(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRYYYRRR"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYOOOYYY"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOWWWOOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWRRRWWW"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawMiddle180", () => {
    const rotatedCube = R.yawMiddle180(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRROOORRR"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYWWWYYY"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOORRROOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWYYYWWW"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawMiddle270", () => {
    const rotatedCube = R.yawMiddle270(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRWWWRRR"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYRRRYYY"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOYYYOOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWOOOWWW"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawBottom90", () => {
    const rotatedCube = R.yawBottom90(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRYYY"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYOOO"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOWWW"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWRRR"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawBottom180", () => {
    const rotatedCube = R.yawBottom180(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRROOO"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYWWW"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOORRR"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWYYY"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawBottom270", () => {
    const rotatedCube = R.yawBottom270(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRWWW"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYRRR"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOYYY"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWOOO"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("pitchLeft90", () => {
    const rotatedCube = R.pitchLeft90(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("YBBYBBYBB"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("GYYGYYGYY"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWBWWBWWB"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("WGGWGGWGG"));
  });

  it("pitchLeft180", () => {
    const rotatedCube = R.pitchLeft180(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("GBBGBBGBB"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("WYYWYYWYY"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWYWWYWWY"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("BGGBGGBGG"));
  });

  it("pitchLeft270", () => {
    const rotatedCube = R.pitchLeft270(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("WBBWBBWBB"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("BYYBYYBYY"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWGWWGWWG"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("YGGYGGYGG"));
  });

  it("pitchMiddle90", () => {
    const rotatedCube = R.pitchMiddle90(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BYBBYBBYB"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YGYYGYYGY"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("WBWWBWWBW"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GWGGWGGWG"));
  });

  it("pitchMiddle180", () => {
    const rotatedCube = R.pitchMiddle180(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BGBBGBBGB"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YWYYWYYWY"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("WYWWYWWYW"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GBGGBGGBG"));
  });

  it("pitchMiddle270", () => {
    const rotatedCube = R.pitchMiddle270(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BWBBWBBWB"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YBYYBYYBY"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("WGWWGWWGW"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GYGGYGGYG"));
  });

  it("pitchRight90", () => {
    const rotatedCube = R.pitchRight90(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBYBBYBBY"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYGYYGYYG"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("BWWBWWBWW"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGWGGWGGW"));
  });

  it("pitchRight180", () => {
    const rotatedCube = R.pitchRight180(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBGBBGBBG"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYWYYWYYW"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("YWWYWWYWW"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGBGGBGGB"));
  });

  it("pitchRight270", () => {
    const rotatedCube = R.pitchRight270(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBWBBWBBW"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYBYYBYYB"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("GWWGWWGWW"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGYGGYGGY"));
  });

  it("rollFront90", () => {
    const rotatedCube = R.rollFront90(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBOOO"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRBRRBRRB"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYYYY"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("GOOGOOGOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWWWW"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("RRRGGGGGG"));
  });

  it("rollFront180", () => {
    const rotatedCube = R.rollFront180(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBGGG"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRORRORRO"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYYYY"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("ROOROOROO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWWWW"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("BBBGGGGGG"));
  });

  it("rollFront270", () => {
    const rotatedCube = R.rollFront270(solvedCube);
    expect(R.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBRRR"));
    expect(R.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRGRRGRRG"));
    expect(R.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYYYY"));
    expect(R.getRightFace(rotatedCube)).to.deep.equal(Array.from("BOOBOOBOO"));
    expect(R.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWWWW"));
    expect(R.getBottomFace(rotatedCube)).to.deep.equal(Array.from("OOOGGGGGG"));
  });
});
