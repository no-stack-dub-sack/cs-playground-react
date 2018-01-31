import createJestTest from '../utils/test/app/create-jest-test'
import { CODE } from '../assets/codeRef'
import { forEach } from 'lodash'

import {
  suppressConsole,
  enableConsole
} from '../utils/test/app/jest-test-utils'

const IDS = [
  'AnagramPalindrome',
  'FlattenAnArray',
  'GenerateCheckerboard',
  'LongestCommonPrefix',
  'NoTwoConsecutiveChars',
  'SumAllPrimes',
]

describe('Algorithm Challenges: solution code passes tests', () =>
  forEach(IDS, createJestTest))

/* eslint-disable no-eval */
describe('Algorithm Challenges: seed code does not have errors', () => {
  forEach(CODE.EASY_ALGOS, challenge => {
    test(`${challenge.title} seed compiles without errors`, () => {
      eval(suppressConsole + challenge.seed + enableConsole)
      expect(true).toBe(true)
    })
  })
  forEach(CODE.MODERATE_ALGOS, challenge => {
    test(`${challenge.title} seed compiles without errors`, () => {
      eval(suppressConsole + challenge.seed + enableConsole)
      expect(true).toBe(true)
    })
  })
})

test('All Algorithm Challenges are being tested', () =>
  expect(IDS.length).toEqual(
    CODE.EASY_ALGOS.length +
    CODE.MODERATE_ALGOS.length)
  )
