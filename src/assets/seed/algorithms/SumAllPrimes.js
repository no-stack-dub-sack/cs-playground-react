export default {
  title: 'Sum All Primes',
  seed:
`// given a number, return the sum of all prime
// numbers less than or equal to the number itself

/**
  * @function sumAllPrimes
  * @param {number} num
  * @returns {number}
  */

function sumAllPrimes(num) {
    return num
}

console.log('sumAllPrimes(977) => ' + sumAllPrimes(977))
`,
  solution:
`// given a number, return the sum of all prime
// numbers less than or equal to the number itself

/**
  * @function sumAllPrimes
  * @param {number} num
  * @returns {number}
  */

function sumAllPrimes(num) {
    let arr = Array.from({ length: num + 1 }, (v, k) => k).slice(2)
    let onlyPrimes = arr.filter(n => {
        let m = n - 1
        while (m > 1 && m >= Math.sqrt(n)) {
            if (n % m === 0) return false
            m--
        }
        return true
    })

    if (!onlyPrimes.length) {
      return 0
    }

    return onlyPrimes.reduce((a, b) => a + b)
}

console.log('sumAllPrimes(977) => ' + sumAllPrimes(977))
`,
  resources: [
    { href: 'https://www.freecodecamp.org/challenges/sum-all-primes', caption: 'freeCodeCamp Challenge' },
    { href: 'https://guide.freecodecamp.org/certificates/sum-all-primes', caption: 'freeCodeCamp Guides (solutions)' },
  ]
}
