import createJestTest from '../utils/test/app/create-jest-test';

describe('Algorithm Challenges: Solution Code Passes Tests', () => {

  const IDS = [
    'AnagramPalindrome',
    'GenerateCheckerboard',
    'NoTwoConsecutiveChars',
    'SumAllPrimes',
  ];

  IDS.forEach(createJestTest);

});
