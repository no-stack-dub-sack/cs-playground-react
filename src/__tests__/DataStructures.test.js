import createJestTest from '../utils/test/create-jest-test';

describe('Data Structures Solution Code Passes Tests', () => {

  const IDS = [
    'BinarySearchTree',
    'Stack'
  ];

  IDS.forEach(createJestTest);

});
