export const tail = `
if (typeof new HashTable() === 'object') {
  HashTable.prototype.__clearTable__ = function() {
    this.collection = {};
    return true;
  }
  HashTable.prototype.__print__ = function() {
    return JSON.stringify(this.collection);
  }
}

const __table__ = new HashTable();
`;

export const tests = [
  {
    expression: `typeof __table__ === 'object'`,
    message: `The <code>HashTable</code> data structure exists`
  },
  {
    expression: `__table__.__clearTable__() && typeof __table__.collection === 'object' && JSON.stringify(__table__.collection) === '{}'`,
    message: `The <code>HashTable</code> data structure has a property called <code>collection</code> which intializes to an empty object literal`
  },
  {
    expression: `typeof __table__.hash === 'function'`,
    message: `The <code>HashTable</code> class has a method called <code>hash</code>`
  },
  {
    expression: `(() => {
      __table__.__clearTable__()
      const test_1 = __table__.hash('cool') === 429
      const test_2 = __table__.hash('whoah, I cant believe this actually works!') === 3900
      return test_1 && test_2
    })()`,
    message: `For the tests to work properly, the <code>hash</code> method must return the sum of the given string's UTF-16 code units ( e.g. <code>table.hash('cool') === 429</code> ). HINT: use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt">String.charCodeAt()</a>. NOTE: This is a naive hashing function, meant to demonstrate the concept of collision!`
  },
  {
    expression: `typeof __table__.add === 'function'`,
    message: `The <code>HashTable</code> class has a method called <code>add</code>, which takes <code>key</code> and <code>value</code> as arguments (the <code>key</code> arg should be a string, and/or the <code>hash</code> method should convert it to a string)`
  },
  {
    expression: `((tests) => {
      __table__.__clearTable__()
      __table__.add('Peter Weinberg', 7686)
      if (!__table__.collection[1363]) {
        tests[5].message = 'There is no value stored at the expected hash key. Be sure to hash your key when you add using <code>hash</code> method and store your key/value pair at the key it returns.'
        return false
      }
      const entry = JSON.stringify(__table__.collection[1363])
      return /Peter Weinberg/.test(entry) && /7686/.test(entry)
    })(tests)`,
    message: `The <code>add</code> method stores key/value pairs at hashed keys in the table's collection object`
  },
  {
    expression: `typeof __table__.lookup === 'function'`,
    message: `The <code>HashTable</code> class has a method called <code>lookup</code>, which takes an unhashed key as an argument`
  },
  {
    expression: `((tests) => {
      __table__.__clearTable__()
      __table__.add('Peter Weinberg', 7686)
      if (!__table__.collection[1363]) {
        tests[7].message = 'There is no value stored at the expected hash key. Be sure to hash your key when you add using <code>hash</code> method and store your key/value pair at the key it returns.'
        return false
      }
      return __table__.lookup('Peter Weinberg') === 7686
    })(tests)`,
    message: `The <code>lookup</code> method looks up a key by its hash, and returns the value pair associated with that key`
  },
  {
    expression: `((tests) => {
      __table__.__clearTable__()
      __table__.add('Peter Weinberg', 7686)
      __table__.add('Weinberg Peter', 8000)
      if (!__table__.collection[1363]) {
        tests[8].message = 'There is no value stored at the expected hash key. Be sure to hash your key when you add using <code>hash</code> method and store your key/value pair at the key it returns.'
        return false
      }
      if (__table__.collection[1363].length !== 2) {
        tests[8].message = 'For 2 keys that produce the same hash, there should be 2 key/value pair entries stored in an array at that hash.'
        return false
      }
      const test_1 = __table__.lookup('Weinberg Peter') === 8000
      const test_2 = __table__.lookup('Peter Weinberg') === 7686
      const test_3 = __table__.remove('Peter Weinberg') === 7686
      if (!__table__.collection[1363]) {
        tests[8].message = 'For 2 keys that produce the same hash, be careful not to remove both key/value pairs when trying to remove one.'
        return false
      }
      const test_4 = __table__.lookup('Peter Weinberg') === null
      const test_5 = __table__.lookup('Weinberg Peter') === 8000
      const test_6 = __table__.remove('Weinberg Peter') === 8000
      const test_7 = !__table__.collection[1363]
      return test_1 && test_2 && test_3 && test_4 && test_5 && test_6 && test_7
    })(tests)`,
    message: `The add, lookup, and remove methods handle instances of collision (i.e. when more than one key/value pair produce the same hash key, key/value pairs should be stored in an array, or 'bucket', at the hashed key)`
  },
  // {
  //   expression: ``,
  //   message: `When more than one key/value pair produces the same hashed key, i.e. 'collision', the hash __table__ should store an array, or 'bucket', of key/value pair objects`
  // },
  // {
  //   expression: ``,
  //   message: ``
  // },
]
