export default `
  if (tests) {
    console.log('\\n/***** TESTS *****/\\n\\n');
    tests.forEach(test => {
      try {
        // eslint-disable-next-line
        assert(eval(test.expression), test.message);
        console.log('Pass: ' + test.message)
      } catch (e) {
        console.log('Fail: ' + test.message);
      }
    });
  }
`;
