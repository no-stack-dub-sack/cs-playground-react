import { SUPPRESS_TESTS, DISABLE_LOOP_PROTECT } from '../../regexp'
import executeTests from './execute-tests'
import loopProtect from './loop-protect'
import TESTS from '../../../assets/testRef'
/* eslint-disable no-eval */

export default (code, id) => {

  // import funcs used in executeTests so in
  // scope during eval, see ./execute-tests.js

  /* eslint-disable no-unused-vars */
  const assert = require('assert')
  const { forEach, invoke } = require('lodash')
  const { beginTests, logTestReport } = require('./testReport')
  const isTestDisabled = require('../common/is-test-disabled')
  /* eslint-enable no-unused-vars */

  let prepend = 'const tests = ', tail = '', tests = ''

  // if suppressTests is true or tests do not exist
  // only eval code, otherwise eval & execute tests
  if (!SUPPRESS_TESTS.test(code) && TESTS[id]) {
    tests = prepend + JSON.stringify(TESTS[id].tests, null, 2)
    if (TESTS[id].tail) tail += TESTS[id].tail
  }

  // apply loop-protect if not disabled by user
  if (!DISABLE_LOOP_PROTECT.test(code))
    code = loopProtect(code) + '\n\n'
    // add line break to counteract
    // whitespace trim by loopProtect

  try {
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
