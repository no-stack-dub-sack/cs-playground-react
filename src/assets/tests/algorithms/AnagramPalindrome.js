export const tests = [
  {
    expression: `typeof anagramPalindrome === 'function'`,
    message: '<code>anagramPalindrome</code> is a function'
  },
  {
    expression: `typeof anagramPalindrome('string') === 'boolean'`,
    message: '<code>anagramPalindrome</code> accepts a string as an argument and returns a boolean'
  },
  {
    expression: `anagramPalindrome('armdabbmaboobrd') === true && anagramPalindrome('caerrac') === true`,
    message: '<code>anagramPalindrome</code> returns <code>true</code> when the given string can be rearranged to form a palindrome'
  },
  {
    expression: `anagramPalindrome('armdabsbmaboobrd') === false && anagramPalindrome('caerracs') === false`,
    message: '<code>anagramPalindrome</code> returns <code>false</code> when the given string cannot be rearranged to form a palindrome'
  }
];
