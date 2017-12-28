import createJestTest from '../utils/test/create-jest-test';

describe('Data Structures: Solution Code Passes Tests', () => {

  const IDS = [
    'BinarySearchTree',
    'LinkedList',
    'Stack'
  ];

  IDS.forEach(createJestTest);

});
