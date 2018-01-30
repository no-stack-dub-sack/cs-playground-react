import createJestTest from '../utils/test/app/create-jest-test'
import { CODE } from '../assets/codeRef'

const IDS = [
  'BubbleSort',
  'BucketSort',
  'HeapSort',
  'InsertionSort',
  'Mergesort',
  'Quicksort',
  'SelectionSort',
]

describe('Sorting Algorithms: Solution Code Passes Tests', () =>
  IDS.forEach(createJestTest))

test('All Sorting Algos are being tested', () =>
  expect(IDS.length).toEqual(CODE.SORTING_ALGOS.length-1))
