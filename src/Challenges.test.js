import TESTS from './assets/testRef';
import CODE from './assets/codeRef';
import { concatStrings, logResults } from './utils/test/test-utils';

// NOTE: AN ISSUE WITH JEST??? IS PREVENTING ME FROM DOING THIS
// PROGRAMATICALLY. COME BACK TO THIS AND FIX THIS UGLY SHIT.

describe('Solution Code Passes Challenge Tests', () => {
  it ('Binary Search Tree', () => {
    const { passed, results } = eval(
      concatStrings(
        CODE.DATA_STRUCTURES[5].solution,
        TESTS.BinarySearchTree.tail,
        JSON.stringify(TESTS.BinarySearchTree.tests)
      )
    );
    logResults(passed, results);
    expect(passed).toBe(true);
  });

  it ('Generate Checkerboard', () => {
    const { passed, results } = eval(
      concatStrings(
        CODE.EASY_ALGOS[1].solution,
        TESTS.GenerateCheckerboard.tail,
        JSON.stringify(TESTS.GenerateCheckerboard.tests)
      )
    );
    logResults(passed, results);
    expect(passed).toBe(true);
  });
});
