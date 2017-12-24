import createJestTest from '../utils/test/create-jest-test';

describe('Algorithm Challenges Solution Code Passes Tests', () => {

  const IDS = [
    'GenerateCheckerboard',
    'SumAllPrimes',
  ];

  IDS.forEach(createJestTest);

});
