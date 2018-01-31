import createJestTest from '../utils/test/app/create-jest-test'
import { CODE } from '../assets/codeRef'
import { forEach } from 'lodash';

import {
  suppressConsole,
  enableConsole
} from '../utils/test/app/jest-test-utils'

const IDS = [
  'BubbleSort',
  'BucketSort',
  'HeapSort',
  'InsertionSort',
  'Mergesort',
  'Quicksort',
  'SelectionSort',
]

describe('Sorting Algorithms: solution code passes tests', () =>
  forEach(IDS, createJestTest))

/* eslint-disable no-eval */
describe('Data Structure Challenges: seed code does not have errors', () => {
  forEach(CODE.SORTING_ALGOS, challenge => {
    // window.performance.now causes testing issues
    if (challenge.title !== 'Sorting Algorithm Benchmarks') {
      test(`${challenge.title} seed compiles without errors`, () => {
        eval(suppressConsole + challenge.seed + enableConsole)
        expect(true).toBe(true)
      })
    }
  })
})

test('All Sorting Algos are being tested', () =>
  expect(IDS.length).toEqual(CODE.SORTING_ALGOS.length-1))
