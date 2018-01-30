export default {
  title: 'Anagram Palindrome',
  seed:
`// given a ramdom string of letters, return true if the letters
// can be rearranged to form a palindrome, otherwise, return false

// Ex1.
// Input: pacescaps
// Output: true

// Ex2.
// Input: javascript
// Output: false

/**
  * @function anagramPalindrome
  * @param {string} str
  * @returns {boolean}
  */

function anagramPalindrome(str) {
    return true
}

console.log(anagramPalindrome('armdabbmaboobrd')) // bombard a drab mob => true
console.log(anagramPalindrome('armdabsbmaboobrd')) // bombards a drab mob => false
console.log(anagramPalindrome('tdolgsaetagdliadaoasaasinvdeavn')) // a santa dog lived as a devil god at nasa => true
console.log(anagramPalindrome('raoistddtagstonveakaaeawfewosln')) // a santa dog lived at nasa for two weeks => false
`,
  solution:
`// given a ramdom string of letters, return true if the letters
// can be rearranged to form a palindrome, otherwise, return false

// Ex1.
// Input: pacescaps
// Output: true

// Ex2.
// Input: javascript
// Output: false

/**
  * @function anagramPalindrome
  * @param {string} str
  * @returns {boolean}
  */

function anagramPalindrome(str) {
  var freq = {}, odds = 0

  for (let letter of str) {
    freq[letter] = -~freq[letter]
  }

  for (let letter in freq) {
    if (freq[letter] % 2 !== 0) {
      odds++
      if (odds > 1) {
        return false
      }
    }
  }

  return true
}

console.log(anagramPalindrome('armdabbmaboobrd')) // bombard a drab mob
console.log(anagramPalindrome('armdabsbmaboobrd')) // bombards a drab mob
console.log(anagramPalindrome('tdolgsaetagdliadaoasaasinvdeavn')) // a santa dog lived as a devil god at nasa
console.log(anagramPalindrome('raoistddtagstonveakaaeawfewosln')) // a santa dog lived at nasa for two weeks
`,
  resources: [
    { href: 'https://www.hackerrank.com/challenges/game-of-thrones/problem', caption: 'Hackerrank Challenge' },
    { href: 'http://www.geeksforgeeks.org/check-given-string-rotation-palindrome/', caption: 'GeeksForGeeks.org' },
  ]
}
