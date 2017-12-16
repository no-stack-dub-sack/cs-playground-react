import executeTests from './execute-tests'
import { SUPPRESS_TESTS } from '../../regexp'
import TESTS from '../../../assets/testRef'

// TODO: remove check for tests once all challenges have tests

export default (code, id) => {
  try {
    /* eslint-disable no-unused-vars */
    const assert = require('assert')
    const { forEach, invoke } = require('lodash')
    const { beginTests, logTestReport } = require('./testReport')
    const isTestDisabled = require('../common/is-test-disabled')
    /* eslint-enable no-unused-vars */

    let prepend = 'const tests = ', tail = '', tests = ''

    // if suppressTests is true, only eval code,
    // otherwise, eval code and run tests (if tests exist)
    if (!SUPPRESS_TESTS.test(code) && TESTS[id]) {
      tests = prepend + JSON.stringify(TESTS[id].tests)
      if (TESTS[id].tail) tail += TESTS[id].tail
    }

    // eslint-disable-next-line
    eval(
      code +
      tail +
      tests +
      executeTests
    )

  } catch (e) {
    console.log(e.toString())
  }
}
