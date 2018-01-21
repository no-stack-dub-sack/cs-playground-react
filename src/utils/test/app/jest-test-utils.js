import chalk from 'chalk';

import {
  __executeTests__,
  __suppressConsole__
} from './jest-test-scripts';

export const concatTests = (
  solution,
  tail,
  tests
) => {
  return `
    // suppress logs during tests
    const console = (${__suppressConsole__})();
    // execute tests
    (() => {
      ${solution}
      ${tail}
      const tests = ${tests};
      ${__executeTests__}
      return typeof __beforeEach__ === 'function'
      ? executeTests(tests, __beforeEach__)
      : executeTests(tests);
    })();
  `;
}

export const logResults = (passed, results, id) => {
  if (!passed) {
    console.log(chalk.keyword('salmon').underline(id + ':'));
    results.forEach(t => {
      if (t[0] === 'F') {
        console.log(chalk.red(t));
      } else {
        console.log(t);
      }
    });
  }
}
