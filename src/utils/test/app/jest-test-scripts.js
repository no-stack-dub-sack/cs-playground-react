// stringify functions, concat in correct order and
// pass to eval for crappy way to test solution code
function _blockConsole() {
  return {
    log: (arg) => {
      if (typeof arg === 'string' && (arg.includes('Pass:') || !arg.includes('Fail:'))) {
        return arg;
      }
      return null
    }
  };
}

function executeTests(tests) {
  let passed = true;
  const results = [];
  const isTestDisabled = require('../common/is-test-disabled');
  if (tests) {
    tests.forEach(test => {
      try {
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

export const testsHead = '\n(function() {\n'
export const declareTests = 'const tests = ';
export const testsTail = `return executeTests(tests); })()`;
export const _executeTests = '\n' + executeTests.toString();
export const blockConsole = `const console = (${_blockConsole.toString()})();\n`
