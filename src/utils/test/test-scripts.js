export const testsHead = `
const console = {
  log: (arg) => {
    if (!arg.includes('Pass:') || !arg.includes('Fail:'))
    return null
  }
};

(function() {
`;

export const declareTests = 'const tests = ';

export const executeTestScript = `
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
`;

export const testsTail = `return executeTests(tests); })()`;
