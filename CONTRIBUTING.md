# Contribution Guide

**NOTE:** This app is built with React and Redux, but if you're just looking to add some new content (like a new algorithm or data structure), knowledge of React or Redux _**is not**_ a prerequisite! You need only know a little JavaScript, and, of course, the topic you are looking to add.

### Contents
- [How To Install / Run](#how-to-install--run)
- [Adding Challenges / Topics](#adding-challenges--topics)
- [Adding Tests](#adding-tests)
- [Modifying Challenges / Topics](#modifying-challenges--topics)

### How To Install / Run
- Be sure that you have NodeJS installed
- Fork repo, clone locally, and run `npm install` or `yarn install`
- In the root directory, run `npm start` or `yarn start`

### Adding Challenges / Topics
To add a new algorithm or data structure, here's what you'll need:
- Some seed, or default code (usually a function or class declaration). This code should not be a complete solution, but it should be able to run without breaking.
- A working (and ideally good) solution to the problem you are introducing.
- At least one resource (this could be an article, a youtube video, a link to an interactive challenge that covers the problem, an image, etc.). If your problem does not have any viable associated resources, think of something related as a placeholder (see the Generate Checkerboard Challenge).

To actually add it to the app, you only need to follow a few simple steps:

__Add Seed file:__
- Create a new seed file in the appropriate directory: `src/assets/seed/<type>/<topic>.js`
- Each seed file is a simple export statement, which exports an object with the following structure:
```js
export default {
  title: 'Super Difficult Sorting Algo',
  seed:
`/**
  * @function superDifficultSortingAlgo
  * @param {number[]} arr
  * @returns {number[]}
  */

function superDifficultSortingAlgo(arr) {
    return arr;
}
`,
  solution:
`/**
  * @function superDifficultSortingAlgo
  * @param {number[]} arr
  * @returns {number[]}
  */

function superDifficultSortingAlgo(arr) {
    // perform super difficult sort here
    // this is where the solution goes!
    return arr;
}
`,
  resources: [
    { href: 'https://wikipedia.com/Super_Difficult_Sorting_Algo', caption: 'Wikipedia' }
    // more resources
  ]
};
```
- Note the backticks, and that code inside the template literal strings _must_ start backed all the way up against the gutter to achieve proper formatting in the editor).

__Import seed:__
- Once you have a complete seed file, according to the above format, simply import it into `src/assets/seed/codeRef.js` and add it to the appropriate array.
- The order that it appears in the array, is the order that it will appear in the UI, so keep this in mind!
- That's it! Once the seed file is imported and added to the array, the rest will happen automatically.

__Update other files:__
- Once you've confirmed your new challenge is working correctly, be sure to update both the "Contents" section of [README.md](https://github.com/no-stack-dub-sack/cs-playground-react/blob/master/README.md) and add your challenge's resources to [RESOURCES.md](https://github.com/no-stack-dub-sack/cs-playground-react/blob/master/RESOURCES.md).

### Adding Tests
Once you've added your new challenge and confirmed that everything works, please add some tests (*__Note:__* If adding tests seems too complicated, and you'd like to cover a good topic that's not already covered, don't hesitate to contribute anyway! I'd hate for the extra complexity to scare away any would-be contributors. Challenges will work without tests, however it is preferred that they are included with all new challenges.).

 If you are adding an algorithm challenge, add enough tests to make reasonably sure the user's solution is valid, and if you're adding a data structure, add tests for the key methods that are essential to understanding the fundamentals of the topic you're adding. Any extra tests that go beyond fundamental understanding can be disabled by default.

 The goal of the tests is to allow users to verify that their understanding of the fundamental concepts are correct. Tests/results will be displayed in the mock console.

__Create a test seed file:__
- The test framework parses the user's code as well as our tests from strings. The seed file _must_ contain a `tests` export, and _may_ contain a `tail` export. The `tests` export is an array of tests, and the `tail` export is a string containing any code that you want to run after the user's code and before the tests execute. For more complex tests, this is where we can initialize variables shared across tests, add hidden methods to classes, or run functions like `beforeEach`.
- Please see files in the `src/assets/tests/` folder for examples of how to set this up.

__Import your test seed:__
- To get your tests running in the app, find the `src/assets/seed/testRef.js` file, import your test file as a module, e.g. `import * as DataStructure from './tests/data-structures/DataStructure'`, and add it to the object being exported from the file.
- This will help you test your code as you go, but for even faster feedback, you can, and should, add your tests to the appropriate file in the `src/__tests__` directory. Just find the file that corresponds to the challenge you're adding, and add the title of the challenge (no spaces, preserve caps) to the `IDS` array.
- Once this is done, you can run `yarn run test` (or `npm run test`), and Jest will run in watch mode, re-running the tests each time you make a change. This way you can easily track your progress and make sure your tests are working. Regardless of the results of `yarn run test`, __ALWAYS__ test your code in the UI before making a PR.

__Add your tail code (optional):__
- If you'd like to execute any code before the tests run, or make code globally available to all tests, here's where you'll define it. There's many examples of this the the above mentioned directory. Most simple algorithm challenges will not need a tail, but complex data structure tests likely will.
- Most importantly with the tail, is the ability to add test hooks, similar to Mocha, Jest, or other frameworks. In the tail, you can add an object called `testHooks` which may have the following methods: `beforeAll`, `beforeEach`, `afterEach`, and `afterAll`. As the names imply, these functions will run before or after each or all tests.
- For example, if you are writing tests for a data structure, you can use the same test structure for all the tests, but it will likely need to be initialized before every one, and maybe have some test data added to it. Before the `testHooks` object, you could add a hidden __clear__ method to the class's prototype.

__Add your tests:__
- Once your tail is set up (if you need one), you can define your tests.
- Each test is an object with an `expression` and `message` key, and optional `method` and `expected` keys.
- The tests use Node's simple assertion library. For tests to pass, the expression should evaluate to true.
- Your expression can be a simple one line expression, or a more complex function defined as an Immediately Invoked Function Expression (IIFE), as long as it can evaluate to true under the right conditions.
- By default, the tests use `assert(expression, message)`, however, if you'd like to use a particular method of `assert` such as `deepEqual` or `strictEqaul`, you can simply define a `method` key on your test with the method name as key. Now, you must also define an `expected` key, so the test knows what to compare with your expression, i.e. `assert.deepEqual(expression, expected, message)`.
- Be sure that your test messages are as clear and concise as possible, and descriptive enough to give the user a clear idea of what the test is asking.

__Test formatting:__
- Also note that test messages should be formatted correctly. Keywords, numbers, variables or anything else that represents actual code should be wrapped in `<code>` tags. While methods that take arguments should have type annotations in the JSDoc style.

__Disabling Tests:__
- For data structures that are very complex, some methods you might add go beyond a fundamental understanding of the concepts. For example, a `pathFromTo` method for a Graph is cool, but might be hard for some users, and is not crucial to learning the basic concepts of a Graph. So this might be a good method to have disabled by default. To disable a test by default, you can add the following code to your test's expression:

```js
if (isTestDisabled(DataStructure, 'method')) {
  return 'DISABLED'
}
```

This code will check for the presence of the method as defined by the second argument. If that method is not defined on the class, the test will be disabled by default. Once the method is defined, the test will begin working.

Here's a simplified example of what all of this might look like put together:

```js
export const tail = `
if (typeof new DataStructure() === 'object') {
  DataStructure.prototype.__clear__ = function() {
    this.__data__ = null
    return true
  }
}

let __dataStructure__
const testHooks = {
  beforeAll: () => {
    __dataStructure__ = new DataStructure()
  },
  beforeEach: () => {
    // clear data structure
    __dataStructure__.__clear__()
    // then add test data
    typeof __dataStructure__.add === 'function' &&
      [3, 2, 4, 1].forEach(n => __dataStructure__.add(n))
  },
  afterEach: () => {
    // runs after each test
  },
  afterAll: () => {
    __dataStructure__ = null
  }
}`

export const tests = [
  // tests
  {
    expression: `typeof __dataStructure__.remove === 'function'`,
    message: `The data structure has an <code>add</code> method: <span class="type">@param {(number|string)} <code>value</code>`
  },
  // more tests
  {
    expression: `(() => {
      if (__dataStructure__.remove() !== 3) {
        return false
      }

      return true
    })()`,
    message: `The <code>remove</code> method removes elements`
  },
  // more tests
  {
    method: 'deepEqual',
    expression: `(() => {
      if (isTestDisabled(DataStructure, 'sort')) {
        return 'DISABLED'
      }
      return __dataStructure__.sort()
    }`,
    expect: [1, 2, 3, 4],
    message: `The <code>sort</code> method returns a sorted array`
  },
]
```

### Modifying Challenges / Topics
- Simply find the seed file in the appropriate `src/assets/seed/<topic>` directory and modify the seed or solution there.
- To see your updates in the browser, you will need to reset the app's state, since state is saved in local storage. Type `resetState()` anywhere in the editor and hit the "Run Code" button twice (the first time a warning that you are about to reset the app will be logged to the console). After resetting, your changes should show up.
