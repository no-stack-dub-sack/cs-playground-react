/*
 * tail only needed for more complex challenges
 * use object prototypes to define hidden methods
 * wrap hidden method names in __ to avoid naming conflicts: __<method name>__
 * use testHooks to define hooks to initialize or clear data structures
 * and to run any other funcs you may need to before, afteer or during execution
 */
export const tail = `
// for example:
// <DataStructure>.prototype.__clear__ = function() {
//
// }

// delete any hook you aren't using
// remove entire object if not using
const testHooks = {
  beforeAll: () => {

  },
  beforeEach: () => {

  },
  afterEach: () => {

  },
  afterAll: () => {

  }
}
`
export const tests = [
  {
    expression: `typeof <algorithm> === 'function'`,
    message: `<code><algorithm></code> is a function`
  },
  {
    expression: `typeof <DataStructure> === 'object'`,
    message: `The <code><DataStructure></code> exists`
  },
  // IIFE format, when the function resolves to a truthy value test will pass
  {
    expression: `(() => {
      // truthy values pass
      // falsy values fail
    })()`,
    message: ``
  },
  // you can use this format if you need other methods available on assert
  // such as deepEqual, deepStrictEqual, notDeepEqual, notDeepStrictEqual, etc.
  {
    method: 'deepEqual',
    expression: ``,
    expected: ``, // value to compare to resolved value of expression
    message: ``
  },
  // more tests here
];
