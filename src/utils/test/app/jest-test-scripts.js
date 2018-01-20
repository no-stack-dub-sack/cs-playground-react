// stringify functions, concat in correct order and
// pass to eval for crappy way to test solution code
const suppressConsole = () => ({
  log: (arg) => {
    if (typeof arg === 'string' &&
       (arg.includes('Pass:') || !arg.includes('Fail:'))
     ) {
      return arg;
    }
    return null
  }
});

function executeTests(tests, __beforeEach__) {
  let passed = true;
  const results = [];
  const isTestDisabled = require('../common/is-test-disabled');
  if (tests) {
    tests.forEach(test => {
      try {
        __beforeEach__ && __beforeEach__();
        expect(eval(test.expression)).toBe(true);
        results.push('Pass: ' + test.message)
      } catch (e) {
        results.push('Fail: ' + test.message);
        passed = false;
      }
    });
  }
  return { passed, results };
}

export const __suppressConsole__ = suppressConsole.toString();
export const __executeTests__ = executeTests.toString();
