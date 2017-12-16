import TESTS from '../../assets/testRef';
import executeTests from './execute-tests';

export default (code, id) => {
  try {
    const assert = require('assert');

    const tail = TESTS[id] && TESTS[id].tail
      ? TESTS[id].tail
      : ''

    const tests = TESTS[id]
      ? 'const tests = ' + JSON.stringify(TESTS[id].tests)
      : '';

    // eslint-disable-next-line
    eval(
      assert +
      code +
      tests +
      tail +
      executeTests
    );
    
  } catch (error) {
    console.log(error.toString());
  }
}
