export default
`/**
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
`;
