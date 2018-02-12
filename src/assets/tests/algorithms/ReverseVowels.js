export const tests = [
  {
    expression: `typeof reverseVowels === 'function'`,
    message: `<code>reverseVowels</code> is a function`
  },
  {
    expression: `reverseVowels('leorn to cade') === 'learn to code'`,
    message: `<code>reverseVowels('leorn to cade')</code> returns <code>'learn to code'</code>`
  },
  {
    expression: `reverseVowels('egnErA CiPaTel LOttIrS') === 'IgnOre CaPiTAl LEtterS'`,
    message: `<code>reverseVowels('egnErA CiPaTel LOttIrS')</code> returns a string with reversed vowels, ignoring case`
  },
  {
    expression: `reverseVowels('Hey, __ignore__ non-word# chars!') === 'Hay, __ognore__ non-wird# chers!'`,
    message: `<code>reverseVowels('Hey, __ignore__ non-word# chars!')</code> returns a string with reversed vowels, ignoring non-word chars`
  },
  {
    expression: `reverseVowels('xycghkl') === 'xycghkl'`,
    message: `<code>reverseVowels</code> returns the original string, unmutated, when it contains no vowels`
  },
  {
    expression: `(() => {
      if (reverseVowels('sOoiuwEcoIhwueibdsadUh') !== 'sUaiewucIohwEuibdsodOh')
        return false
      if (reverseVowels('weErsE oihOn aeAUidESkjdi') !== 'wiErsi UAhen aOioEdESkjde')
        return false
      if (reverseVowels('cuil, et werks! leak ot mo rovirsong stoff') !== 'cool, it works! look at me reversing stuff')
        return false
      if (reverseVowels('#4obU!&seetUa^%!') !== '#4abU!&seetUo^%!')
        return false
      return true
    })()`,
    message: `<code>reverseVowels</code> correctly handles any other string according to these rules`
  },
];
