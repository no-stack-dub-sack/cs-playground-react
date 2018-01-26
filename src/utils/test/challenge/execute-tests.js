function executeTests(
  tests,
  beforeAll = null,
  beforeEach = null,
  afterEach = null,
  afterAll = null
) {
  if (tests) {
    console.log('\n/***** TESTS BEGIN *****/\n');

    // init report vars
    let numPassed = 0, numDisabled = 0;

    // run beforeAll hook
    beforeAll && beforeAll()

    tests.forEach((test, i) => {
      try {
        // prevent further execution disabled
        // eslint-disable-next-line
        if (eval(test.expression) === 'DISABLED') {
          numDisabled++;
          throw new Error('DISABLED');
        } else {
          // run beforeEach hook
          beforeEach && beforeEach()
          // eslint-disable-next-line
          assert(eval(test.expression), test.message);
          // run afterEach hook
          afterEach && afterEach()
          // log passing test message
          console.log('Pass: ' + test.message);
          numPassed++;
        }
      } catch (e) {
        // run afterEach hook when test does not pass
        afterEach && afterEach()

        if (e.message === 'DISABLED') {
          // log disabled / greyed out test message
          console.log('<code>' + e.message + ': ' + test.message + '</code>')
        }
        // ONLY FOR DEV TO DEBUG TESTS:
        else if (e.message !== test.message) {
          console.log('Fail: ' + e.message);
        }
        else {
          // log just failure message
          console.log('Fail: ' + test.message);
        }
      }
    });
    // run afterAll hook
    afterAll && afterAll()
    // report results
    // eslint-disable-next-line
    logTestReport(numPassed, numDisabled, tests)
    console.log('\n/***** TESTS END *****/\n');
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
