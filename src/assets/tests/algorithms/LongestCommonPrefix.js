export const tests = [
  {
    expression: `typeof longestCommonPrefix === 'function'`,
    message: `<code>longestCommonPrefix</code> is a function`
  },
  {
    expression: `
    (() => {
      const __arr1__ = ['aaa', 'aaabbb', 'aaaaccc', 'aabbddd'] // aa
      const __arr2__ = ['cool', 'cooler', 'coolest', 'cooling'] // cool
      const __arr3__ = ['boolean', 'boost', 'booster', 'boon'] // boo
      const __arr4__ = ['boolean', 'boost', 'booster', 'boring'] // bo
      const __arr5__ = ['people', 'peeps', 'person', 'pendulum'] // 'pe'
      const __arr6__ = ['hello', 'hers', 'his', 'hint', 'hurts'] // 'h'
      const __arr7__ = ['a', 'ab', 'ac', 'ad'] // a
      if (longestCommonPrefix(__arr2__) !== 'cool') return false
      if (longestCommonPrefix(__arr3__) !== 'boo') return false
      if (longestCommonPrefix(__arr1__) !== 'aa') return false
      if (longestCommonPrefix(__arr4__) !== 'bo') return false
      if (longestCommonPrefix(__arr5__) !== 'pe') return false
      if (longestCommonPrefix(__arr6__) !== 'h') return false
      if (longestCommonPrefix(__arr7__) !== 'a') return false
      return true
    })()`,
    message: `<code>longestCommonPrefix</code> takes an array of strings and, whenever possible, returns a string representing the longest common prefix ammong the strings`
  },
  {
    expression: `
    (() => {
      const __arr1__ = ['aaa', 'aaabbb', 'aaaaccc', 'c']
      const __arr2__ = ['cool', 'cooler', 'coolest', 'd']
      const __arr3__ = ['boolean', 'boost', 'booster', 'q']
      if (longestCommonPrefix(__arr2__) !== false) return false
      if (longestCommonPrefix(__arr3__) !== false) return false
      if (longestCommonPrefix(__arr1__) !== false) return false
      return true
    })()`,
    message: `When passed an array of strings that share no common prefix, <code>longestCommonPrefix</code> returns <code>false</code>`
  },
]
