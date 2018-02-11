export default {
  title: 'Reverse A String',
  seed:
`/**
  * @function reverseAString
  * @param {string} str - The string to reverse
  * @returns {string}
  */

  // All you have to do is return the characters in the string
  // in reverse order. Punctuation, spaces, and capitalization
  // should be treated in the same as any other character.
  // The most efficient approach here will depend on the length
  // of your string. But try to think about scalability, and see
  // if you can avoid using the built-in .reverse function!

function reverseAString(myString) {
  // Do stuff here

  return 'gnirtSym';
}
`,
  solution:
`/**
  * @function reverseAString
  * @param {string} str - The string to reverse
  * @returns {string}
  */

  // While not the most concise approach, this solution
  // has the benefit of working quickly on very large
  // strings and a small memory overhead.

function reverseAString(str) {
  const arr = str.split('');

  // Define pointers
  let left = 0;
  let right = arr.length - 1;
  
  while(left < right) {
    // Swap the characters at the pointer positions
    const x = arr[left];
    arr[left] = arr[right];
    arr[right] = x;

    // Move the pointers toward each other
    left += 1;
    right -= 1;
  }

  return arr.join('');
}
`,
  resources: [
    { href: 'http://eddmann.com/posts/ten-ways-to-reverse-a-string-in-javascript/', caption: 'Article by Edd Mann'},
   ]
}