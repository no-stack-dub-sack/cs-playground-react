import { concatTests, logResults } from './jest-test-utils';
import tail from '../common/is-test-disabled';
import TESTS from '../../../assets/testRef';
import { SOLUTIONS } from '../../../assets/codeRef';

export default (ID) => {
  test(ID, () => {
    const { passed, results } = eval(
      concatTests(
        SOLUTIONS[ID],
        TESTS[ID].tail ? tail + TESTS[ID].tail : tail,
        JSON.stringify(TESTS[ID].tests)
      )
    );
    logResults(passed, results, ID);
    expect(passed).toBe(true);
  });
}
