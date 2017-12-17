import chalk from 'chalk';

import {
  testsHead,
  testsTail,
  executeTestScript,
  declareTests
} from './test-scripts';

export const concatStrings = (
  solution,
  codeTail,
  testsBody
) => {
  return testsHead.concat(
    solution,
    codeTail,
    declareTests,
    testsBody,
    executeTestScript,
    testsTail
  );
}

export const logResults = (passed, results) => {
  if (!passed) {
    results.forEach(t => {
      if (t[0] === 'F') {
        console.log(chalk.red(t));
      } else {
        console.log(t);
      }
    });
  } else {
    console.log(results);
  }
}
