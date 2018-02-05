export default {
  title: 'Longest Common Prefix',
  seed:
`/**
 * @function longestCommonPrefix
 * @param {string[]} strings
 * @return {string}
 */

// find and return the longest common prefix ammong an array
// of strings. return false if no such common prefix exists.

// ex1: ['people', 'peeps', 'person', 'pendulum'] => 'pe'
// ex2: ['hello', 'hers', 'his', 'hint', 'hurts'] => 'h'
// ex3: ['goodbye', 'good', 'ok', 'great', 'bad'] => false

const longestCommonPrefix = (strings) => {
  return strings[0];
}

console.log(longestCommonPrefix(['cooler', 'coolest', 'cool', 'cooling', 'cooled']));
`,
  solution:
`/**
 * @function longestCommonPrefix
 * @param {string[]} strings
 * @return {string}
 */

const longestCommonPrefix = (strings) => {
    if (!strings.length) return false;

    let prefix = strings[0];
    for (let i = 1; i < strings.length; i++) {
        prefix = findCommon(prefix, strings[i]);
        if (!prefix) return false;
    }

    function findCommon(str1, str2) {
        let i = 0, prefix = '';
        while (i < str1.length && str1[i] === str2[i]) {
            prefix += str1[i++];
        }
        return prefix;
    }

    return prefix;
}

console.log(longestCommonPrefix(['cooler', 'coolest', 'cool', 'cooling', 'cooled']));
`,
  resources: [
    { href: 'https://leetcode.com/problems/longest-common-prefix/solution/', caption: 'LeetCode: Dicussion of various solutions' }
  ]
};
