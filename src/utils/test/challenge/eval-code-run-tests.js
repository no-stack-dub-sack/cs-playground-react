import TESTS from '../../../assets/testRef';
import executeTests from './execute-tests';
import isTestDisabled from './is-test-disabled';

// TODO: remove check for tests once all challenges have tests

export default (code, id, suppressTests) => {
  try {
    const assert = require('assert');

    let prepend = 'const tests = ',
        tail = isTestDisabled,
        tests = '';

    // if suppressTests is true, only eval code,
    // otherwise, eval code and run tests (if tests exist)
    if (!suppressTests && TESTS[id]) {
      tests = prepend + JSON.stringify(TESTS[id].tests);
      if (TESTS[id].tail) tail += TESTS[id].tail;
    }

    // eslint-disable-next-line
    eval(
      assert +
      code +
      tail +
      tests +
      executeTests
    );

  } catch (error) {
    console.log(error.toString());
  }
}
