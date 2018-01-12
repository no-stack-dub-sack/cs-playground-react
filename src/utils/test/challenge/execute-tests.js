// test utility for in-browser challenge testing
// stringify, concat with user code & tests, pass to eval
function executeTests(tests) {
  if (tests) {
    console.log('\n/***** TESTS BEGIN *****/\n');

    tests.forEach((test, i) => {
      try {
        // eslint-disable-next-line
        if (eval(test.expression) === 'DISABLED') {
          // throw error if test is disabled
          throw new Error('DISABLED');
        } else {
          // eslint-disable-next-line
          assert(eval(test.expression), test.message);
          // log passing test message
          console.log('Pass: ' + test.message);
        }
      } catch (e) {
        switch (e.message) {
          case 'DISABLED':
            // log disabled / greyed out test message
            console.log('<code>' + e.message + ': ' + test.message + '</code>');
            break;
          case test.message:
            // log failure message, plus any actual errors
            console.log('Fail: ' + test.message + ' <code>[ ' + e.toString() + ' ]</code>');
            break;
          default:
            // log just failure message
            console.log('Fail: ' + test.message);
        }
      }
    });

    console.log('\n/***** TESTS END *****/\n');
  }
};

export default `\n${executeTests.toString()};\nexecuteTests(tests);\n`;
