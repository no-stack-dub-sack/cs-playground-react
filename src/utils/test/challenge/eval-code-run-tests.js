import { SUPPRESS_TESTS, DISABLE_LOOP_PROTECT } from '../../regexp'
import executeTests from './execute-tests'
import loopProtect from './loop-protect'
import TESTS from '../../../assets/testRef'
import trimComments from './trim-code'
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
  const HAS_LOOPS = new RegExp(/(?:\bwhile|\bfor)\s*?\(.*?\)/)

  // if suppressTests is true or tests do not exist
  // only eval code, otherwise eval & execute tests
  if (!SUPPRESS_TESTS.test(code) && TESTS[id]) {
    tests = prepend + JSON.stringify(TESTS[id].tests)
    if (TESTS[id].tail) tail += TESTS[id].tail
  }

  // check code for do/while/for loops
  // and apply loop-protect if needed
  code = DISABLE_LOOP_PROTECT.test(code)
    ? code
    : HAS_LOOPS.test(trimComments(code))
    ? loopProtect(code)
    : code

  try {
    eval(
      code +
      tail +
      tests +
      executeTests
    )
  } catch (e) {
    const error = e.toString()
    if (/Potential infinite loop/.test(error))
      console.log(error.replace('Error', 'RangeError'))
    else console.log(error)
  }
}
