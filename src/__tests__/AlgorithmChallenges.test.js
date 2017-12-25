import createJestTest from '../utils/test/create-jest-test';

describe('Algorithm Challenges Solution Code Passes Tests', () => {

  const IDS = [
    'GenerateCheckerboard',
    // 'NoTwoConsecutiveChars',
    'SumAllPrimes',
  ];

  IDS.forEach(createJestTest);

});
