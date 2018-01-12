import TESTS from '../../../assets/testRef';
import { SOLUTIONS } from '../../../assets/codeRef';
import { concatTests, logResults } from './jest-test-utils';

export default (ID) => {
  test(ID, () => {
    const { passed, results } = eval(
      concatTests(
        SOLUTIONS[ID],
        TESTS[ID].tail ? TESTS[ID].tail : null,
        JSON.stringify(TESTS[ID].tests)
      )
    );
    logResults(passed, results, ID);
    expect(passed).toBe(true);
  });
}
