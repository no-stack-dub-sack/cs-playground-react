import chalk from 'chalk';

import {
  testsHead,
  testsTail,
  _executeTests,
  declareTests,
  blockConsole
} from './jest-test-scripts';

// for `yarn test` automated testing:

export const concatTests = (
  solution,
  codeTail,
  testsBody
) => {
  return blockConsole.concat(
    testsHead,
    solution,
    codeTail,
    declareTests,
    testsBody,
    _executeTests,
    testsTail
  );
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
  } else {
    console.log(chalk.keyword('salmon').underline(id + ':'));
    console.log(results);
  }
}
