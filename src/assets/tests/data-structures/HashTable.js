/* NOTE:
 * If any tests are added or removed in this file, the tests which have changing messages
 * will need to ammended to be sure that the test at the correct index is being modified.
 * See tests[11] and test[13], for example. If another test is added before these tests
 * each index reference will have to be incremented. This is not ideal, and is part of
 * the reason why this cool way of using more dynamic test messages is not more widely
 * used throughout the codebase. I could not get a `this` reference to work correctly
 * so that this could be more flexible and not require these kinds of changes, e.g.
 * this.message = 'This doesn't work! Like, at all' `this` is always undefined
 */

export const tail = `
if (typeof new HashTable() === 'object') {
  HashTable.prototype.__clearTable__ = function() {
    this.collection = {}
    return true
  }
  HashTable.prototype.__print__ = function() {
    return JSON.stringify(this.collection)
  }
}

let __table__
const testHooks = {
  beforeAll: () => {
    __table__ = new HashTable()
  },
  beforeEach: () => {
    __table__.__clearTable__()
  },
  afterAll: () => {
    __table__ = null
  }
}

const isProperlyHashed = (tests, index) => {
  if (!__table__.collection[1363]) {
    tests[index].message = 'There is no value stored at the expected hash key. Be sure to hash your key when you add using <code>hash</code> method and store your key/value pair at the key it returns.'
    return false
  }
  return true
}
`

export const tests = [
  {
    expression: `typeof __table__ === 'object'`,
    message: `The <code>HashTable</code> data structure exists`
  },
  {
    expression: `typeof __table__.collection === 'object' && JSON.stringify(__table__.collection) === '{}'`,
    message: `The <code>HashTable</code> data structure has a property called <code>collection</code> which intializes to an empty object literal`
  },
  {
    expression: `typeof __table__.hash === 'function'`,
    message: `The <code>HashTable</code> class has a method called <code>hash</code>: <span class="type">@param {(string|number)}</span> <code>key</code> <span class="type">@returns {string}</span>`
  },
  {
    expression: `(() => {
      const TEST_1 = __table__.hash('cool') === 429
      const TEST_2 = __table__.hash('whoah, I cant believe this actually works!') === 3900
      return TEST_1 && TEST_2
    })()`,
    message: `For the tests to work properly, the <code>hash</code> method must return the sum of the given string's UTF-16 code units ( e.g. <code>table.hash('cool') === 429</code> ). HINT: use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt" rel="noopener noreferrer" target="_blank">String.charCodeAt()</a>. NOTE: This is a naive hashing function, meant to demonstrate the concept of collision!`
  },
  {
    expression: `typeof __table__.add === 'function'`,
    message: `The <code>HashTable</code> class has a method called <code>add</code>: <span class="type">@param {(string|number)}</span> <code>key</code> <span class="type">@param {(string|number)}</span> <code>value</code>(the <code>key</code> arg should be a string, and/or the <code>hash</code> method converts it to a string)`
  },
  {
    expression: `((tests) => {
      __table__.add('Peter Weinberg', 7686)
      if (!isProperlyHashed(tests, 5)) return false
      const entry = JSON.stringify(__table__.collection[1363])
      return /Peter Weinberg/.test(entry) && /7686/.test(entry)
    })(tests)`,
    message: `The <code>add</code> method stores key/value pairs at hashed keys in the table's collection object`
  },
  {
    expression: `((tests) => {
      __table__.add('Peter Weinberg', 7686)
      if (!isProperlyHashed(tests, 6)) return false
      return __table__.add('Peter Weinberg', 9000) === null
    })(tests)`,
    message: `The <code>add</code> method returns <code>null</code> when passed a key/value pair that shares the same key (before hashing) as a pair already stored in the table`
  },
  {
    expression: `typeof __table__.lookup === 'function'`,
    message: `The <code>HashTable</code> class has a method called <code>lookup</code>, which takes an unhashed key as an argument: <span class="type">@param {(string|number)}</span> <code>key</code>`
  },
  {
    expression: `((tests) => {
      __table__.add('Peter Weinberg', 7686)
      if (!isProperlyHashed(tests, 8)) return false
      return __table__.lookup('Peter Weinberg') === 7686
    })(tests)`,
    message: `The <code>lookup</code> method looks up a key by its hash, and returns the value pair associated with that key`
  },
  {
    expression: `(() => {
      const TEST_1 = __table__.lookup('Peter Weinberg') === null
      __table__.add('Peter Weinberg', 7686)
      if (!isProperlyHashed(tests, 9)) return false
      const TEST_2 = __table__.lookup('Cool') === null
      return TEST_1 && TEST_2
    })()`,
    message: `The <code>lookup</code> method returns null when called on an empty hash table or when no key/value pair is found at the given key`
  },
  {
    expression: `typeof __table__.remove === 'function'`,
    message: `The <code>HashTable</code> class has a method called <code>remove</code>, which takes an unhashed key as an argument: <span class="type">@param {(string|number)}</span> <code>key</code>`
  },
  {
    expression: `((tests) => {
      __table__.add('Peter Weinberg', 7686)
      if (!isProperlyHashed(tests, 11)) return false
      return __table__.remove('Peter Weinberg') === 7686 && !__table__.collection[1363]
    })(tests)`,
    message: `The remove method removes key value pairs from table and returns the stored value`
  },
  {
    expression: `((tests) => {
      if (!(__table__.remove('Cool!') === null)) return false
      __table__.add('Peter Weinberg', 7686)
      if (!(__table__.remove('Cool!') === null)) return false
      return true
    })(tests)`,
    message: `The <code>remove</code> method returns null when called on an empty hash table or when no key/value pair is found at the given key`
  },
  {
    expression: `((tests) => {
      __table__.add('Peter Weinberg', 7686)
      __table__.add('Weinberg Peter', 8000)

      if (!isProperlyHashed(tests, 13)) return false

      if (__table__.collection[1363].length !== 2) {
        tests[13].message = 'When 2 or more keys produce the same hash, key/value pair entries are stored in an array, or "bucket", at that hash.'
        return false
      }

      const TEST_1 = __table__.lookup('Weinberg Peter') === 8000
      const TEST_2 = __table__.lookup('Peter Weinberg') === 7686
      if (!TEST_1 || !TEST_2) {
        tests[13].message = 'The <code>lookup</code> method correctly looks up two key/value pairs stored at the same hash key.'
        return false
      }

      const TEST_3 = __table__.remove('Peter Weinberg') === 7686
      if (!TEST_3) {
        tests[13].message = 'The <code>remove</code> method correctly removes/returns values in instances of collision.'
        return false
      }

      if (!__table__.collection[1363]) {
        tests[13].message = 'In instances of collision, be careful not to remove all values stored at a shared hash key.'
        return false
      }

      const TEST_4 = __table__.lookup('Peter Weinberg') === null
      const TEST_5 = __table__.lookup('Weinberg Peter') === 8000
      if (!TEST_4 || !TEST_5) {
        tests[13].message = 'When 2 key/value pairs are stored at the same hash key and one is removed, looking up the removed key returns <code>null</code>, looking up the other correctly returns the associated value.'
        return false
      }

      const TEST_6 = __table__.remove('Weinberg Peter') === 8000
      const TEST_7 = !__table__.collection[1363]
      if (!TEST_6 || !TEST_7) {
        tests[13].message = 'The <code>remove</code> method correctly removes/returns values in instances of collision.'
        return false
      }

      return true
    })(tests)`,
    message: `The hash table handles collisions (i.e. when more than one key/value pair produce the same hash key)`
  }
]
