import createJestTest from '../utils/test/create-jest-test';

describe('Sorting Algorithm Solution Code Passes Tests', () => {

  const IDS = [
    'BubbleSort',
    'BucketSort',
    'HeapSort',
    'InsertionSort',
    'Mergesort',
    'Quicksort',
    'SelectionSort',
  ];

  IDS.forEach(createJestTest);

});
