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

function executeTests(tests, hook = {}) {
  let passed = true
  const results = []
  /* eslint-disable no-unused-vars */
  const isTestDisabled = require('../common/is-test-disabled')
  const { invoke, forEach } = require('lodash')
  const assert = require('assert')
  /* eslint-enable no-unused-vars */
  if (tests) {
    invoke(hook, 'beforeAll')
    forEach(tests, test => {
      try {
        invoke(hook, 'beforeEach')
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
        invoke(hook, 'afterEach')
        results.push('Pass: ' + test.message)
      } catch (e) {
        results.push('Fail: ' + test.message)
        passed = false
      }
    })
  }
  invoke(hook, 'afterAll')
  return { passed, results }
}

export const __suppressConsole__ = suppressConsole.toString()
export const __executeTests__ = executeTests.toString()
