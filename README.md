# CS-Playground-React: Algos & Data Structures

An interactive overview of common sorting algorithms and data structures, implemented in JavaScript, with optional "challenge mode" (get your code to pass all the tests!). This also includes several other miscellaneous algorithm challenges, similar to those asked in programming interviews. This is intended to help you brush up on your computer science fundamentals, algorithm, and problem solving skills. Contributions are welcome! 

__This is meant as a reference / review only &mdash; if you haven't already learned / solved these problems on your own, I recommend giving them a try in the editor first before looking at the solution code! If you get stuck, there are plenty of resources accessible right through the app to help you along. A full list of resources can also be found [here](https://github.com/no-stack-dub-sack/cs-playground-react/blob/master/RESOURCES.md).__

This project uses [CodeMirror](https://codemirror.net/) and [React-CodeMirror2](https://github.com/scniro/react-codemirror2/) to embed an editor into the browser (the original React-Codemirror is out of date, not maintained, and does not play well with React 16). It also uses a fun little hack to run the code and hijack `console.log`, creating a little REPL which outputs into a mock console. Oh, and a [little script](https://github.com/lingtalfi/simpledrag) I found to help with the resizable panes!

![image](https://user-images.githubusercontent.com/18563015/32872296-fe5a79c6-ca53-11e7-9fd4-446ea6b516cc.png)
The app is currently live here: https://cs-playground-react.surge.sh/

## Saving / Clearing Code:
- Any _NON-SOLUTION_ code you edit is persisted throughout the session via Redux, and state is persisted using local storage across sessions, so you can leave, close your browser, and come back later, and your code will still be there, without having to log in or create credentials. Be careful though! Once your browsers local storage is cleared, you will lose all of your work.
- To reset the application state from within the app, call the `resetState()` function in the embedded editor.
- If for some reason you do not want to save your code, leave the following comment before navigating away or closing your browser:
```js
// DO NOT SAVE
```

## Key Bindings / Application Shortcut Keys:
- The editor has SublimeText keybindings.
- Additional keys bindings / shortcuts:
  - Scroll through themes: <kbd>CMD/CTRL</kbd> + <kbd>ALT</kbd> + (<kbd>{</kbd> OR <kbd>}</kbd>)
  - Go to the next challenge: <kbd>CMD/CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>.</kbd>
  - Go to the previous challenge: <kbd>CMD/CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>,</kbd>
  - Jump to solution / seed: <kbd>CMD/CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>S</kbd>
  - Run code / tests: <kbd>CMD/CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>ENTER</kbd>
  - Toggle Suppress Tests: <kbd>CMD/CTRL</kbd> + <kbd>ALT</kbd> + <kbd>/</kbd>
  - Clear Console: <kbd>ALT</kbd> + <kbd>SHIFT</kbd> + <kbd>DELTE/BACKSPACE</kbd>
  - Open autocomplete dropdown: <kbd>CTRL</kbd> + <kbd>SPACE</kbd>
  - Focus Editor: <kbd>CMD/CTRL</kbd> + <kbd>\\</kbd>
- Search / Replace functionalities:
  - Start searching: <kbd>CMD/CTRL</kbd> + <kbd>F</kbd>
  - Find next: <kbd>CMD/CTRL</kbd> + <kbd>G</kbd>
  - Find previous: <kbd>CMD/CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>G</kbd>
  - Replace: <kbd>CMD</kbd> + <kbd>ALT</kbd> + <kbd>F</kbd> OR <kbd>SHIFT</kbd> + <kbd>CTRL</kbd> + <kbd>F</kbd>
  - Replace all: <kbd>SHIFT</kbd> + <kbd>CMD</kbd> + <kbd>ALT</kbd> + <kbd>F</kbd> OR <kbd>SHIFT</kbd> + <kbd>CTRL</kbd> + <kbd>R</kbd>
  - Jump to line: <kbd>ALT</kbd> + <kbd>G</kbd>

## Contents:
### Sorting Algorithms:
- Quicksort
- Mergesort
- Selection Sort
- Insertion Sort
- Bubble Sort
- Heap Sort
- Bucket Sort
- Sorting Algorithm Benchmarks

### Data Structures:
- Stack
- Queue
- Priority Queue
- Linked List
- Doubly Linked List
- Binary Search Tree
- Max Heap
- Hash Table
- Graph

### Algorithm Challenges
**Easy:**
- Sum All Primes
- Generate Checkerboard
- Flatten An Array
- Is Palindrome _(coming soon)_
- Fizz Buzz _(coming soon)_

**Moderate/Difficult:**
- Longest Common Prefix
- No Two Consecutive Chars
- Anagram Palindrome
- Rotate An Image _(coming soon)_

## To Install/Run:
- Fork repo, clone locally, and run `npm install` or `yarn install`
- In the root directory, run `npm start` or `yarn start`

## \*\*_Challenge!_
Some of my solutions are less than perfect. If you come up with a better one, or want to add a new algorithm or data structure that I haven't covered, feel free to submit a PR!

### A note on JSDoc:
The [JSDoc](https://github.com/jsdoc3/jsdoc)-like documentation found throughout the editor's files are just that: JSDoc-_like_. These comments would not produce proper documentation if the JSDoc utility were ran on these source files. These comments, instead, loosely follow the JSDoc style, and are just meant as a recognizable reference for users, so that they can easily see how each function, parameter, class, property, and method is meant to be used. Eventually, there are plans for changing to actual JSDoc comments and corresponding markdown documentation, but this is currently not a high priority. Any new challenges, however, should be added with this style of comments.

***

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

<kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd><kbd>
