function executeTests(tests) {
  if (tests) {
    console.log('\n/***** TESTS BEGIN *****/\n');

    tests.forEach((test, i) => {
      try {
        // eslint-disable-next-line
        assert(eval(test.expression), test.message);
        console.log('Pass: ' + test.message);
      } catch (e) {
        if (e.message !== test.message) {
          console.log('Fail: ' + test.message + ' <code>[ ' + e.toString() + ' ]</code>');
        } else {
          console.log('Fail: ' + test.message);
        }
      }
    });

    console.log('\n/***** TESTS END *****/\n');
  }
};

export default `\n${executeTests.toString()};\nexecuteTests(tests);\n`;
