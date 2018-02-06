import createJestTest from '../utils/test/app/create-jest-test'
import { CODE } from '../assets/codeRef';
import { forEach } from 'lodash';

import {
  suppressConsole,
  enableConsole
} from '../utils/test/app/jest-test-utils'

const IDS = [
  'BinarySearchTree',
  'CircularDoublyLinkedList',
  'DoublyLinkedList',
  'Graph',
  'HashTable',
  'LinkedList',
  'MaxHeap',
  'PriorityQueue',
  'Queue',
  'Stack',
]

describe('Data Structures: solution code passes tests', () =>
  forEach(IDS, createJestTest))

/* eslint-disable no-eval */
describe('Data Structure Challenges: seed code does not have errors', () => {
  forEach(CODE.DATA_STRUCTURES, challenge => {
    test(`${challenge.title} seed compiles without errors`, () => {
      eval(suppressConsole + challenge.seed + enableConsole)
      expect(true).toBe(true)
    })
  })
})

test('All Data Structures are being tested', () =>
  expect(IDS.length).toEqual(CODE.DATA_STRUCTURES.length))
