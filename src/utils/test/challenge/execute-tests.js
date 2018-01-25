// test utility for in-browser challenge testing
// stringify, concat with user code & tests, pass to eval
function executeTests(tests, __beforeEach__ = null) {
  if (tests) {
    console.log('\n/***** TESTS BEGIN *****/\n');
    let numPassed = 0, numDisabled = 0;
    tests.forEach((test, i) => {
      try {
        // eslint-disable-next-line
        if (eval(test.expression) === 'DISABLED') {
          // throw error if test is disabled
          numDisabled++;
          throw new Error('DISABLED');
        } else {
          __beforeEach__ && __beforeEach__();
          // eslint-disable-next-line
          assert(eval(test.expression), test.message);
          // log passing test message
          console.log('Pass: ' + test.message);
          numPassed++;
        }
      } catch (e) {
        if (e.message === 'DISABLED') {
          // log disabled / greyed out test message
          console.log('<code>' + e.message + ': ' + test.message + '</code>')
        }

        // ONLY FOR DEV TO DEBUG TESTS:
        // else if (e.message !== test.message) {
        //   console.log('Fail: ' + e.message);
        // }

        else {
          // log just failure message
          console.log('Fail: ' + test.message);
        }
      }
    });

    console.log('\nREPORT:');
    console.log('‾‾‾‾‾‾‾');
    console.log(`- ${numPassed} out of ${tests.length} tests passed`);
    console.log(`- ${tests.length - numPassed} out of ${tests.length} tests failed`);
    console.log(`<code>- ${numDisabled} test${numDisabled === 1 ? '' : 's'} disabled (define method to enable)</code>`);

    console.log('\n/***** TESTS END *****/\n');
  }
}

export default `
${executeTests}
typeof __beforeEach__ === 'function'
  ? executeTests(tests, __beforeEach__)
  : executeTests(tests)
`;
