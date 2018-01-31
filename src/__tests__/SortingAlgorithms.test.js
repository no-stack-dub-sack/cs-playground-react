import createJestTest from '../utils/test/app/create-jest-test'
import { CODE } from '../assets/codeRef'
import { forEach } from 'lodash';

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
  forEach(IDS, createJestTest))

test('All Sorting Algos are being tested', () =>
  expect(IDS.length).toEqual(CODE.SORTING_ALGOS.length-1))
