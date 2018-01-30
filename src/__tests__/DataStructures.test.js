import createJestTest from '../utils/test/app/create-jest-test'
import { CODE } from '../assets/codeRef';

const IDS = [
  'BinarySearchTree',
  'DoublyLinkedList',
  'Graph',
  'HashTable',
  'LinkedList',
  'MaxHeap',
  'PriorityQueue',
  'Queue',
  'Stack'
]

describe('Data Structures: Solution Code Passes Tests', () =>
  IDS.forEach(createJestTest))

test('All Data Structures are being tested', () =>
  expect(IDS.length).toEqual(CODE.DATA_STRUCTURES.length))
