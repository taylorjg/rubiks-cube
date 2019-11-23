import { expect } from 'chai'
import * as L from '../logic/index'

describe('rotation tests', () => {

  it('no rotation', () => {
    expect(L.getTopFace(L.solvedCube)).to.deep.equal(Array.from('BBBBBBBBB'))
    expect(L.getLeftFace(L.solvedCube)).to.deep.equal(Array.from('RRRRRRRRR'))
    expect(L.getFrontFace(L.solvedCube)).to.deep.equal(Array.from('YYYYYYYYY'))
    expect(L.getRightFace(L.solvedCube)).to.deep.equal(Array.from('OOOOOOOOO'))
    expect(L.getBackFace(L.solvedCube)).to.deep.equal(Array.from('WWWWWWWWW'))
    expect(L.getBottomFace(L.solvedCube)).to.deep.equal(Array.from('GGGGGGGGG'))
  })

  it('yawTop90', () => {
    const rotatedCube = L.yawTop90(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BBBBBBBBB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('WWWRRRRRR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('RRRYYYYYY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('YYYOOOOOO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('OOOWWWWWW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GGGGGGGGG'))
  })

  it('yawTop180', () => {
    const rotatedCube = L.yawTop180(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BBBBBBBBB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('OOORRRRRR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('WWWYYYYYY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('RRROOOOOO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('YYYWWWWWW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GGGGGGGGG'))
  })

  it('yawTop270', () => {
    const rotatedCube = L.yawTop270(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BBBBBBBBB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('YYYRRRRRR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('OOOYYYYYY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('WWWOOOOOO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('RRRWWWWWW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GGGGGGGGG'))
  })

  it('yawMiddle90', () => {
    const rotatedCube = L.yawMiddle90(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BBBBBBBBB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RRRWWWRRR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YYYRRRYYY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OOOYYYOOO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WWWOOOWWW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GGGGGGGGG'))
  })

  it('yawMiddle270', () => {
    const rotatedCube = L.yawMiddle270(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BBBBBBBBB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RRRYYYRRR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YYYOOOYYY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OOOWWWOOO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WWWRRRWWW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GGGGGGGGG'))
  })

  it('yawBottom90', () => {
    const rotatedCube = L.yawBottom90(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BBBBBBBBB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RRRRRRWWW'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YYYYYYRRR'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OOOOOOYYY'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WWWWWWOOO'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GGGGGGGGG'))
  })

  it('yawBottom180', () => {
    const rotatedCube = L.yawBottom180(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BBBBBBBBB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RRRRRROOO'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YYYYYYWWW'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OOOOOORRR'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WWWWWWYYY'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GGGGGGGGG'))
  })

  it('yawBottom270', () => {
    const rotatedCube = L.yawBottom270(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BBBBBBBBB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RRRRRRYYY'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YYYYYYOOO'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OOOOOOWWW'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WWWWWWRRR'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GGGGGGGGG'))
  })

  it('pitchLeft90', () => {
    const rotatedCube = L.pitchLeft90(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('WBBWBBWBB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RRRRRRRRR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('BYYBYYBYY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OOOOOOOOO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WWGWWGWWG'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('YGGYGGYGG'))
  })

  it('pitchLeft180', () => {
    const rotatedCube = L.pitchLeft180(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('GBBGBBGBB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RRRRRRRRR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('WYYWYYWYY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OOOOOOOOO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WWYWWYWWY'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('BGGBGGBGG'))
  })

  it('pitchLeft270', () => {
    const rotatedCube = L.pitchLeft270(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('YBBYBBYBB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RRRRRRRRR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('GYYGYYGYY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OOOOOOOOO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WWBWWBWWB'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('WGGWGGWGG'))
  })

  it('pitchMiddle90', () => {
    const rotatedCube = L.pitchMiddle90(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BWBBWBBWB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RRRRRRRRR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YBYYBYYBY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OOOOOOOOO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WGWWGWWGW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GYGGYGGYG'))
  })

  it('pitchMiddle270', () => {
    const rotatedCube = L.pitchMiddle270(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BYBBYBBYB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RRRRRRRRR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YGYYGYYGY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OOOOOOOOO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WBWWBWWBW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GWGGWGGWG'))
  })

  it('pitchRight90', () => {
    const rotatedCube = L.pitchRight90(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BBWBBWBBW'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RRRRRRRRR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YYBYYBYYB'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OOOOOOOOO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('GWWGWWGWW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GGYGGYGGY'))
  })

  it('pitchRight180', () => {
    const rotatedCube = L.pitchRight180(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BBGBBGBBG'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RRRRRRRRR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YYWYYWYYW'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OOOOOOOOO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('YWWYWWYWW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GGBGGBGGB'))
  })

  it('pitchRight270', () => {
    const rotatedCube = L.pitchRight270(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BBYBBYBBY'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RRRRRRRRR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YYGYYGYYG'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OOOOOOOOO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('BWWBWWBWW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GGWGGWGGW'))
  })

  it('rollFront90', () => {
    const rotatedCube = L.rollFront90(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BBBBBBOOO'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RRBRRBRRB'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YYYYYYYYY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('GOOGOOGOO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WWWWWWWWW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('RRRGGGGGG'))
  })

  it('rollFront180', () => {
    const rotatedCube = L.rollFront180(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BBBBBBGGG'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RRORRORRO'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YYYYYYYYY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('ROOROOROO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WWWWWWWWW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('BBBGGGGGG'))
  })

  it('rollFront270', () => {
    const rotatedCube = L.rollFront270(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BBBBBBRRR'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RRGRRGRRG'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YYYYYYYYY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('BOOBOOBOO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WWWWWWWWW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('OOOGGGGGG'))
  })

  it('rollMiddle90', () => {
    const rotatedCube = L.rollMiddle90(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BBBOOOBBB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RBRRBRRBR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YYYYYYYYY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OGOOGOOGO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WWWWWWWWW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GGGRRRGGG'))
  })

  it('rollMiddle270', () => {
    const rotatedCube = L.rollMiddle270(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('BBBRRRBBB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('RGRRGRRGR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YYYYYYYYY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OBOOBOOBO'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WWWWWWWWW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GGGOOOGGG'))
  })

  it('rollBack90', () => {
    const rotatedCube = L.rollBack90(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('OOOBBBBBB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('BRRBRRBRR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YYYYYYYYY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OOGOOGOOG'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WWWWWWWWW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GGGGGGRRR'))
  })

  it('rollBack180', () => {
    const rotatedCube = L.rollBack180(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('GGGBBBBBB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('ORRORRORR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YYYYYYYYY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OOROOROOR'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WWWWWWWWW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GGGGGGBBB'))
  })

  it('rollBack270', () => {
    const rotatedCube = L.rollBack270(L.solvedCube)
    expect(L.getTopFace(rotatedCube)).to.deep.equal(Array.from('RRRBBBBBB'))
    expect(L.getLeftFace(rotatedCube)).to.deep.equal(Array.from('GRRGRRGRR'))
    expect(L.getFrontFace(rotatedCube)).to.deep.equal(Array.from('YYYYYYYYY'))
    expect(L.getRightFace(rotatedCube)).to.deep.equal(Array.from('OOBOOBOOB'))
    expect(L.getBackFace(rotatedCube)).to.deep.equal(Array.from('WWWWWWWWW'))
    expect(L.getBottomFace(rotatedCube)).to.deep.equal(Array.from('GGGGGGOOO'))
  })
})
