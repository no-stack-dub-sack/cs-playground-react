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
    this.data = {}
    return true
  }
  HashTable.prototype.__print__ = function() {
    return JSON.stringify(this.data)
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
  if (!__table__.data[1363]) {
    tests[index].message = 'There is no value stored at the expected hash key. Be sure to hash your key when you add using <code>hash</code> method and store your key/value pair at the key it returns.'
    return false
  }
  return true
}
`

export const tests = [
  {
    expression: `typeof __table__ === 'object'`,
    message: `The <code>HashTable</code> data structure exists (no tests for this challenge!)`
  }
]
