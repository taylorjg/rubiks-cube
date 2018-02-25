import * as S from './index';

const demo = () => {

  const moves = [
    S.yawTop90,
    S.rollFront180,
    S.pitchLeft90,
    S.yawMiddle90
  ];

  const shuffledCube = S.makeMoves(S.solvedCube, moves);
  const solution = S.solve(shuffledCube);

  if (solution) {
    console.log(`solution.length: ${solution.length}`);
    S.makeMoves(shuffledCube, solution, true /* display */);
  }
  else {
    console.log('No solution found!');
  }
};

demo();
