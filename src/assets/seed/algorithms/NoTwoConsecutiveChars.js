export default {
  title: 'No Two Consecutive Chars',
  seed:
`// Given a random string, return a new string containing all the
// characters of the original string, but no 2 characters should
// be consecutive. If such a string can't be created, return false.

// Ex1.
// Input: ABBCCD
// Output: ABCBCD

// Ex2.
// Input: AAAB
// Output: false

/**
 * @function noTwoConsecutiveChars
 * @param {string} str The String to operate on
 * @returns {(string|bool)} Rearranged string or false
 */

function noTwoConsecutiveChars(str) {

    return str
}

console.log(noTwoConsecutiveChars('aaba'))
console.log(noTwoConsecutiveChars('aabba'))
console.log(noTwoConsecutiveChars('aaaaaaabbbbcc'))
console.log(noTwoConsecutiveChars('aaabaaabbbbbbbbbccccbbcbsd'))
console.log(noTwoConsecutiveChars('aaabaaabbbbbbbbbbccccbbcbsd'))
console.log(noTwoConsecutiveChars('aaabaaabbbbbbbbbbbccccbbcbsd'))
`,
  solution:
`// Given a random string, return a new string containing all the
// characters of the original string, but no 2 characters should
// be consecutive. If such a string can't be created, return false.

// Ex1.
// Input: ABBCCD
// Output: ABCBCD

// Ex2.
// Input: AAAB
// Output: false

/**
 * @function noTwoConsecutiveChars
 * @param {string} str The String to operate on
 * @returns {(string|bool)} Rearranged string or false
 */

function noTwoConsecutiveChars(str) {

    var freqTable = {}

    for (var char of str) {
        freqTable[char] = -~freqTable[char]
    }


    function getNextChar(newStr = '', lastChar = '') {
        var mostFreq = 0,
            nextMostFreq = 0,
            nextChar = ''

        for (var char in freqTable) {
            if (freqTable[char] > mostFreq) {
                mostFreq = freqTable[char]
                nextChar = char
            }

            if (nextChar === lastChar) {
                if (freqTable[char] > nextMostFreq && char !== lastChar) {
                    nextMostFreq = freqTable[char]
                    nextChar = char
                }
            }
        }


        if (!mostFreq) {
            return newStr
        } else if (nextChar === lastChar) {
            return false
        } else {
            newStr+=nextChar
            lastChar = nextChar
            freqTable[lastChar]--
            return getNextChar(newStr, lastChar)
        }
    }

    return getNextChar()
}

console.log(noTwoConsecutiveChars('aaba'))
console.log(noTwoConsecutiveChars('aabba'))
console.log(noTwoConsecutiveChars('aaaaaaabbbbcc'))
console.log(noTwoConsecutiveChars('aaabaaabbbbbbbbbccccbbcbsd'))
console.log(noTwoConsecutiveChars('aaabaaabbbbbbbbbbccccbbcbsd'))
console.log(noTwoConsecutiveChars('aaabaaabbbbbbbbbbbccccbbcbsd'))
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/rearrange-characters-string-no-two-adjacent/', caption: 'GeeksforGeeks.org'},
  ]
}
