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
      return typeof testHooks !== 'undefined'
      ? executeTests(
          tests,
          testHooks.beforeAll,
          testHooks.beforeEach,
          testHooks.afterEach
        )
      : executeTests(tests);
    })();
  `;
}

export const logResults = (passed, results, id) => {
  if (!passed) {
    console.log(chalk.keyword('salmon').underline(id + ':'));
    results.forEach(t => t[0] === 'F'
      ? console.log(chalk.red(t))
      : console.log(t)
    )
  } else {
    // console.log(chalk.keyword('salmon').underline(id + ':'));
    // results.forEach(t => console.log(t))
  }
}
