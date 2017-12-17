import TESTS from './assets/testRef';
import CODE from './assets/codeRef';
import { concatTests, logResults } from './utils/test/test-utils';

// NOTE: AN ISSUE WITH JEST??? IS PREVENTING ME FROM DOING THIS
// PROGRAMATICALLY. COME BACK TO THIS AND FIX THIS UGLY SHIT.

describe('Solution Code Passes Challenge Tests', () => {
  it ('Binary Search Tree', () => {
    const ID = 'BinarySearchTree';
    const { passed, results } = eval(
      concatTests(
        CODE.DATA_STRUCTURES[5].solution,
        TESTS[ID].tail,
        JSON.stringify(TESTS[ID].tests)
      )
    );
    logResults(passed, results, ID);
    expect(passed).toBe(true);
  });

  it ('Generate Checkerboard', () => {
    const ID = 'GenerateCheckerboard';
    const { passed, results } = eval(
      concatTests(
        CODE.EASY_ALGOS[1].solution,
        TESTS[ID].tail,
        JSON.stringify(TESTS[ID].tests)
      )
    );
    logResults(passed, results, ID);
    expect(passed).toBe(true);
  });

  it ('Sum All Primes', () => {
    const ID = 'SumAllPrimes';
    const { passed, results } = eval(
      concatTests(
        CODE.EASY_ALGOS[0].solution,
        null,
        JSON.stringify(TESTS[ID].tests)
      )
    );
    logResults(passed, results, ID);
    expect(passed).toBe(true);
  });
});
