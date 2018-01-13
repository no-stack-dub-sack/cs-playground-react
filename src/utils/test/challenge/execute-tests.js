// test utility for in-browser challenge testing
// stringify, concat with user code & tests, pass to eval
function executeTests(tests) {
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
          // eslint-disable-next-line
          assert(eval(test.expression), test.message);
          // log passing test message
          console.log('Pass: ' + test.message);
          numPassed++;
        }
      } catch (e) {
        switch (e.message) {
          case 'DISABLED':
            // log disabled / greyed out test message
            console.log('<code>' + e.message + ': ' + test.message + '</code>');
            break;
          case test.message:
            // log just failure message
            console.log('Fail: ' + test.message);
            break;
          default:
            // log failure message, plus any actual errors
            console.log('Fail: ' + test.message + ' <code>[ ' + e.toString() + ' ]</code>');
        }
      }
    });

    console.log('\nREPORT:');
    console.log('‾‾‾‾‾‾‾');
    console.log(`- ${numPassed} out of ${tests.length} tests passed`);
    console.log(`- ${tests.length - numPassed} out of ${tests.length} tests failed`);
    console.log(`<code>- ${numDisabled} tests disabled (define method to enable)</code>`);

    console.log('\n/***** TESTS END *****/\n');
  }
};

export default `\n${executeTests.toString()};\nexecuteTests(tests);\n`;
