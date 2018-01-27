import createJestTest from '../utils/test/app/create-jest-test';

describe('Data Structures: Solution Code Passes Tests', () => {

  const IDS = [
    'BinarySearchTree',
    'DoublyLinkedList',
    'Graph',
    'LinkedList',
    'MaxHeap',
    'PriorityQueue',
    'Queue',
    'Stack'
  ];

  IDS.forEach(createJestTest);

});
