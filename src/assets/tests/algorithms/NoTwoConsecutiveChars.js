export const tail = `
  const isValid = (str) => {
    for (let i = 1; i < str.length; i++) {
      if (str[i-1] === str[i]) {
        return false;
      }
    }

    return true;
  }

  const countChars = (str) => {
    const charsMap = {};
    for (let char of str) {
      charsMap[char] = -~charsMap[char];
    }

    return charsMap;
  }

  const compareChars = (map1, map2) => {
    const keys1 = Object.keys(map1).sort();
    const keys2 = Object.keys(map2).sort();
    if (JSON.stringify(keys1) !== JSON.stringify(keys2)) {
      return false;
    }

    for (let key in map1) {
      if (map1[key] !== map2[key]) {
        return false;
      }
    }

    return true;
  }
`;
export const tests = [
  {
    expression: `typeof noTwoConsecutiveChars === 'function'`,
    message: '<code>noTwoConsecutiveChars</code> is a function'
  },
  {
    expression: `
      (() => {
        const test_1 = isValid(noTwoConsecutiveChars('aabba'));
        const test_2 = isValid(noTwoConsecutiveChars('aaaaaaabbbbcc'));
        const test_3 = isValid(noTwoConsecutiveChars('aaabaaabbbbbbbbbccccbbcbsd'));
        const test_4 = isValid(noTwoConsecutiveChars('aaabaaabbbbbbbbbbccccbbcbsd'));
        const originalCharsMap_1 = countChars('aaabaaabbbbbbbbbbccccbbcbsd');
        const resultCharsMap_1 = countChars(noTwoConsecutiveChars('aaabaaabbbbbbbbbbccccbbcbsd'));
        const originalCharsMap_2 = countChars('aaabaaabbbbbbbbbccccbbcbsd');
        const resultCharsMap_2 = countChars(noTwoConsecutiveChars('aaabaaabbbbbbbbbccccbbcbsd'));
        const isSameChars_1 = compareChars(originalCharsMap_1, resultCharsMap_1);
        const isSameChars_2 = compareChars(originalCharsMap_2, resultCharsMap_2);
        return test_1 && test_2 && test_3 && test_4 && isSameChars_1 && isSameChars_2;
      })()`,
    message: 'whenever possible, <code>noTwoConsecutiveChars</code> should return a string that contains all the characters from the original string, rearranged so that no two consecutive characters are the same'
  },
  {
    expression: `noTwoConsecutiveChars('aaba') === false && noTwoConsecutiveChars('aaabaaabbbbbbbbbbbccccbbcbsd') === false && typeof noTwoConsecutiveChars('aaabaaabbbbbbbbbbccccbbcbsd') === 'string'`,
    message: '<code>noTwoConsecutiveChars</code> should return <code>false</code> when a string with no consecutive chars can\'t be constructed'
  },
];
