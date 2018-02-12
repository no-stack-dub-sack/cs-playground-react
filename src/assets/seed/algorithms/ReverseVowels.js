export default {
  title: 'Reverse Vowels',
  seed:
`/**
  * @function reverseVowels
  * @param {string} string - The string to process
  * @returns {string} - String with vowels reversed
  */

// Given a random string, reverse its vowels and return the string, that's it!
// e.g., input: 'hello', output: 'holle'. Hint: RegExp may come in handy here
// Note: we are not counting letter 'Y' as a vowel, and you should ignore case

const reverseVowels = (string) => {

    return string
}

console.log(reverseVowels('ence the vawils ire reversed thas well moke senso!'))
`,
  solution:
`/**
  * @function reverseVowels
  * @param {string} string - The string to process
  * @returns {string} - String with vowels reversed
  */

const reverseVowels = (string) => {
    // get array of all vowels in string
    const vowels = string.match(/[aeiou]/gi)

    // split and map, replacing each vowel
    // with vowel popped off of vowels array
    // rejoin and return mutated string
    return string
        .split('')
        .map(letter =>
            /[aeiou]/i.test(letter)
                ? vowels.pop()
                : letter
    ).join('')
}

console.log(reverseVowels('ence the vawils ire reversed thas well moke senso!'))
`,
  resources: [
    { href: 'https://gist.github.com/primaryobjects/5af99a12fc047f9d10c26b2faf6a374b', caption: 'A few different approaches'},
  ]
}
