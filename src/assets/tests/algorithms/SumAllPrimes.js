export const tests = [
  {
    expression: `typeof sumAllPrimes === 'function'`,
    message: '<code>sumAllPrimes</code> is a function'
  },
  {
    expression: `typeof sumAllPrimes(5) === 'number'`,
    message: '<code>sumAllPrimes</code> returns a number'
  },
  {
    expression: `sumAllPrimes(1) === 0 && sumAllPrimes(-11) === 0`,
    message: '<code>sumAllPrimes</code> returns <code>0</code> if there are no prime numbers less than the argument provided'
  },
  {
    expression: `sumAllPrimes(977) === 73156`,
    message: `<code>sumAllPrimes(977)</code> returns <code>73156</code>`
  },
  {
    expression: `sumAllPrimes(2000) === 277050`,
    message: `<code>sumAllPrimes(2000)</code> returns <code>277050</code>`
  },
  {
    expression: `sumAllPrimes(3450) === 761455`,
    message: `<code>sumAllPrimes(3450)</code> returns <code>761455</code>`
  }
];
