import { expect } from 'chai';
import { solvedCube } from '../solving/index';
import * as S from '../solving/index';

describe("rotation tests", () => {

  it("no rotation", () => {
    expect(S.getTopFace(solvedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(S.getLeftFace(solvedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(S.getFrontFace(solvedCube)).to.deep.equal(Array.from("YYYYYYYYY"));
    expect(S.getRightFace(solvedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(S.getBackFace(solvedCube)).to.deep.equal(Array.from("WWWWWWWWW"));
    expect(S.getBottomFace(solvedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawTop90", () => {
    const rotatedCube = S.yawTop90(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("WWWRRRRRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("RRRYYYYYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("YYYOOOOOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("OOOWWWWWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawTop180", () => {
    const rotatedCube = S.yawTop180(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("OOORRRRRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("WWWYYYYYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("RRROOOOOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("YYYWWWWWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawTop270", () => {
    const rotatedCube = S.yawTop270(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("YYYRRRRRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("OOOYYYYYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("WWWOOOOOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("RRRWWWWWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawMiddle90", () => {
    const rotatedCube = S.yawMiddle90(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRWWWRRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYRRRYYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOYYYOOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWOOOWWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawMiddle180", () => {
    const rotatedCube = S.yawMiddle180(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRROOORRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYWWWYYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOORRROOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWYYYWWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawMiddle270", () => {
    const rotatedCube = S.yawMiddle270(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRYYYRRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYOOOYYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOWWWOOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWRRRWWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawBottom90", () => {
    const rotatedCube = S.yawBottom90(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRWWW"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYRRR"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOYYY"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWOOO"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawBottom180", () => {
    const rotatedCube = S.yawBottom180(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRROOO"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYWWW"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOORRR"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWYYY"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("yawBottom270", () => {
    const rotatedCube = S.yawBottom270(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBBBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRYYY"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYOOO"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOWWW"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWRRR"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGGGG"));
  });

  it("pitchLeft90", () => {
    const rotatedCube = S.pitchLeft90(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("WBBWBBWBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("BYYBYYBYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWGWWGWWG"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("YGGYGGYGG"));
  });

  it("pitchLeft180", () => {
    const rotatedCube = S.pitchLeft180(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("GBBGBBGBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("WYYWYYWYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWYWWYWWY"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("BGGBGGBGG"));
  });

  it("pitchLeft270", () => {
    const rotatedCube = S.pitchLeft270(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("YBBYBBYBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("GYYGYYGYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWBWWBWWB"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("WGGWGGWGG"));
  });

  it("pitchMiddle90", () => {
    const rotatedCube = S.pitchMiddle90(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BWBBWBBWB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YBYYBYYBY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WGWWGWWGW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GYGGYGGYG"));
  });

  it("pitchMiddle180", () => {
    const rotatedCube = S.pitchMiddle180(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BGBBGBBGB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YWYYWYYWY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WYWWYWWYW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GBGGBGGBG"));
  });

  it("pitchMiddle270", () => {
    const rotatedCube = S.pitchMiddle270(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BYBBYBBYB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YGYYGYYGY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WBWWBWWBW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GWGGWGGWG"));
  });

  it("pitchRight90", () => {
    const rotatedCube = S.pitchRight90(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBWBBWBBW"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYBYYBYYB"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("GWWGWWGWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGYGGYGGY"));
  });

  it("pitchRight180", () => {
    const rotatedCube = S.pitchRight180(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBGBBGBBG"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYWYYWYYW"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("YWWYWWYWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGBGGBGGB"));
  });

  it("pitchRight270", () => {
    const rotatedCube = S.pitchRight270(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBYBBYBBY"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRRRRRRRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYGYYGYYG"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOOOOOOOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("BWWBWWBWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGWGGWGGW"));
  });

  it("rollFront90", () => {
    const rotatedCube = S.rollFront90(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBOOO"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRBRRBRRB"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYYYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("GOOGOOGOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWWWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("RRRGGGGGG"));
  });

  it("rollFront180", () => {
    const rotatedCube = S.rollFront180(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBGGG"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRORRORRO"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYYYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("ROOROOROO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWWWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("BBBGGGGGG"));
  });

  it("rollFront270", () => {
    const rotatedCube = S.rollFront270(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBBBBRRR"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RRGRRGRRG"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYYYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("BOOBOOBOO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWWWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("OOOGGGGGG"));
  });

  it("rollMiddle90", () => {
    const rotatedCube = S.rollMiddle90(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBOOOBBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RBRRBRRBR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYYYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OGOOGOOGO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWWWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGRRRGGG"));
  });

  it("rollMiddle180", () => {
    const rotatedCube = S.rollMiddle180(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBGGGBBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RORRORROR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYYYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OROOROORO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWWWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGBBBGGG"));
  });

  it("rollMiddle270", () => {
    const rotatedCube = S.rollMiddle270(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("BBBRRRBBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("RGRRGRRGR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYYYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OBOOBOOBO"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWWWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGOOOGGG"));
  });

  it("rollBack90", () => {
    const rotatedCube = S.rollBack90(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("OOOBBBBBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("BRRBRRBRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYYYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOGOOGOOG"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWWWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGRRR"));
  });

  it("rollBack180", () => {
    const rotatedCube = S.rollBack180(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("GGGBBBBBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("ORRORRORR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYYYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOROOROOR"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWWWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGBBB"));
  });

  it("rollBack270", () => {
    const rotatedCube = S.rollBack270(solvedCube);
    expect(S.getTopFace(rotatedCube)).to.deep.equal(Array.from("RRRBBBBBB"));
    expect(S.getLeftFace(rotatedCube)).to.deep.equal(Array.from("GRRGRRGRR"));
    expect(S.getFrontFace(rotatedCube)).to.deep.equal(Array.from("YYYYYYYYY"));
    expect(S.getRightFace(rotatedCube)).to.deep.equal(Array.from("OOBOOBOOB"));
    expect(S.getBackFace(rotatedCube)).to.deep.equal(Array.from("WWWWWWWWW"));
    expect(S.getBottomFace(rotatedCube)).to.deep.equal(Array.from("GGGGGGOOO"));
  });
});
