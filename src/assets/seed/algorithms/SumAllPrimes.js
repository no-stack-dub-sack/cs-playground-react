export default {
seed:
`// given a number, return the sum of all prime
// numbers less than or equal to the number itself

/**
  * @function sumAllPrimes
  * @param {number} num
  * @return {number}
  */

function sumAllPrimes(num) {
    retun num;
}

console.log('sumAllPrimes(977) => ' + sumAllPrimes(977));
`,
solution:
`// given a number, return the sum of all prime
// numbers less than or equal to the number itself

/**
  * @function sumAllPrimes
  * @param {number} num
  * @return {number}
  */

function sumAllPrimes(num) {
    let arr = Array.from({ length: num + 1 }, (v, k) => k).slice(2);
    let onlyPrimes = arr.filter(n => {
        let m = n - 1;
        while (m > 1 && m >= Math.sqrt(n)) {
            if (n % m === 0) return false;
            m--;
        }
        return true;
    });
    return onlyPrimes.reduce((a, b) => a + b);
}

console.log('sumAllPrimes(977) => ' + sumAllPrimes(977));
`
};
