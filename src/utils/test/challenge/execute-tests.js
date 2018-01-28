/* eslint-disable no-eval */
/* eslint-disable no-undef */
function executeTests(
  tests,
  beforeAll = null,
  beforeEach = null,
  afterEach = null,
  afterAll = null
) {
  if (tests) {
    console.log(beginTests)
    // init report vars
    let numPassed = 0, numDisabled = 0
    // run beforeAll hook
    beforeAll && beforeAll()
    // iterate tests array
    tests.forEach((test, i) => {
      try {
        // run beforeEach hook
        beforeEach && beforeEach()
        // eval to prevent further execution if disabled
        if (eval(test.expression) === 'DISABLED') {
          numDisabled++;
          throw new Error('DISABLED')
        } else {
          // run beforeEach again since test
          // expression has already been evaled
          beforeEach && beforeEach()
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
          afterEach && afterEach()
          // log passing test message
          console.log('Pass: ' + test.message)
          numPassed++;
        }
      } catch (e) {
        // run afterEach hook when test does not pass
        afterEach && afterEach()
        // is test disabled?
        if (e.message === 'DISABLED') {
          // log disabled / greyed out test message
          console.log('<code>' + e.message + ': ' + test.message + '</code>')
        }
        // ONLY FOR DEV TO DEBUG TESTS:
        else if (e.message !== test.message) {
          console.log('Fail: ' + e.message)
        }
        else {
          // log just failure message
          console.log('Fail: ' + test.message)
        }
      }
    });
    // run afterAll hook
    afterAll && afterAll()
    // report results
    // eslint-disable-next-line
    logTestReport(numPassed, numDisabled, tests)
  }
}

// check for test hooks before calling executeTests
// call accordingly based on results

export default `
${executeTests}
typeof testHooks !== 'undefined'
  ? executeTests(
      tests,
      testHooks.beforeAll,
      testHooks.beforeEach,
      testHooks.afterEach,
      testHooks.afterAll
    )
  : executeTests(tests)
`;
