// for `yarn test` automated testing:

function _blockConsole() {
  return {
    log: (arg) => {
      if (!arg.includes('Pass:') || !arg.includes('Fail:'))
      return null
    }
  };
}

function executeTests(tests) {
  let passed = true;
  const results = [];
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
