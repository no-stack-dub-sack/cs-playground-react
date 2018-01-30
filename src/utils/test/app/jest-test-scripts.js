/* eslint-disable no-eval */

// stringify functions, concat in correct order and
// pass to eval for crappy way to test solution code
const suppressConsole = () => ({
  log: (arg) => {
    if (typeof arg === 'string' &&
       (arg.includes('Pass:') || !arg.includes('Fail:'))
     ) {
      return arg
    }
    return null
  }
})

function executeTests(
  tests,
  beforeAll = null,
  beforeEach = null,
  afterEach = null,
  afterAll = null
) {
  let passed = true
  const results = []
  /* eslint-disable no-unused-vars */
  const isTestDisabled = require('../common/is-test-disabled')
  const assert = require('assert')
  /* eslint-enable no-unused-vars */
  beforeAll && beforeAll()
  if (tests) {
    beforeAll && beforeAll()
    tests.forEach(test => {
      try {
        beforeEach && beforeEach()
        if (test.method) {
          // assert w/ method
          assert[test.method](
            eval(test.expression),
            test.expected,
            test.message
          )
        } else {
          // assert w/o method
          assert(eval(test.expression), test.message)
        }
        afterEach && afterEach()
        results.push('Pass: ' + test.message)
      } catch (e) {
        results.push('Fail: ' + test.message)
        passed = false
      }
    })
  }
  afterAll && afterAll()
  return { passed, results }
}

export const __suppressConsole__ = suppressConsole.toString()
export const __executeTests__ = executeTests.toString()
