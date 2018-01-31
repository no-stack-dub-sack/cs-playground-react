/* eslint-disable no-eval */
/* eslint-disable no-undef */
function executeTests(tests, hook = {}) {
  if (tests) {
    console.log(beginTests)
    // init report vars
    let numPassed = 0, numDisabled = 0
    // run beforeAll hook
    invoke(hook, 'beforeAll')
    // iterate tests array
    forEach(tests, (test, i) => {
      try {
        // run beforeEach hook
        invoke(hook, 'beforeEach')
        // eval to prevent further execution if disabled
        if (eval(test.expression) === 'DISABLED') {
          numDisabled++
          throw new Error('DISABLED')
        } else {
          // run beforeEach again since test
          // expression has already been evaled
          invoke(hook, 'beforeEach')
          // test enabled
          if (test.method) {
            // assert w/ method
            assert[test.method](
              eval(test.expression),
              test.expected,
              test.message
            )
          } else {
            // assert w/ no method
            assert(eval(test.expression), test.message)
          }
          // run afterEach hook
          invoke(hook, 'afterEach')
          // log passing test message
          console.log('Pass: ' + test.message)
          numPassed++
        }
      } catch (e) {
        // run afterEach hook when test does not pass
        invoke(hook, 'afterEach')
        // is test disabled?
        if (e.message === 'DISABLED') {
          // log disabled / greyed out test message
          console.log('<code>' + e.message + ': ' + test.message + '</code>')
        }
        // else if ( // ONLY FOR DEV TO DEBUG TESTS:
        //   process.env.NODE_ENV !== 'production' &&
        //   e.message !== test.message
        // ) {
        //   console.log('Fail: ' + e.message)
        // }
        else {
          // log just failure message
          console.log('Fail: ' + test.message)
        }
      }
    })
    // run afterAll hook
    invoke(hook, 'afterAll')
    // report results
    logTestReport(numPassed, numDisabled, tests)
  }
}

export default `
${executeTests}
typeof testHooks !== 'undefined'
  ? executeTests(tests, testHooks)
  : executeTests(tests)
`
