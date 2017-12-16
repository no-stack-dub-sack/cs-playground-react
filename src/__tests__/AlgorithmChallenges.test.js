import createJestTest from '../utils/test/app/create-jest-test'
import { CODE } from '../assets/codeRef'
import { forEach } from 'lodash';

const IDS = [
  'AnagramPalindrome',
  'GenerateCheckerboard',
  'NoTwoConsecutiveChars',
  'SumAllPrimes',
]

describe('Algorithm Challenges: Solution Code Passes Tests', () =>
  forEach(IDS, createJestTest))

test('All Algorithm Challenges are being tested', () =>
  expect(IDS.length).toEqual(
    CODE.EASY_ALGOS.length +
    CODE.MODERATE_ALGOS.length)
  )
