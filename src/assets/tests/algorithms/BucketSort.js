export const tests = [
  {
    expression: `typeof bucketSort === 'function'`,
    message: '<code>bucketSort</code> is a function'
  },
  {
    expression: `Array.isArray(bucketSort([0.01,0.02,0.02])) && JSON.stringify(bucketSort([0.01,0.02,0.02])) === '[0.01,0.02,0.02]'`,
    message: '<code>bucketSort</code> accepts and returns an array'
  },
  {
    expression: `!/\\.sort\\s*\\(.*\\)/.test(bucketSort.toString())`,
    message: '<code>bucketSort</code> does not use the built in <code>Array.sort()</code> method'
  },
  {
    expression: `
      (() => {
        return JSON.stringify(bucketSort([
          0.77, 0.39, 0.26, 0.33, 0.55, 0.71,
          0.23, 0.88, 0.47, 0.52, 0.72, 0.99,
          0.63, 0.45, 0.21, 0.12, 0.23, 0.94
        ])) === '[0.12,0.21,0.23,0.23,0.26,0.33,0.39,0.45,0.47,0.52,0.55,0.63,0.71,0.72,0.77,0.88,0.94,0.99]' &&
        JSON.stringify(bucketSort([
          0.22, 0.01, 0.02, 0.0001, 0.0102, 0.0210,
          0.011, 0.0233, 0.076, 0.088, 0.99, 0.0654
        ])) === '[0.0001,0.01,0.0102,0.011,0.02,0.021,0.0233,0.0654,0.076,0.088,0.22,0.99]';
      })()`,
    message: '<code>bucketSort</code> sorts arrays of floating point numbers from least to greatest'
  }
];
