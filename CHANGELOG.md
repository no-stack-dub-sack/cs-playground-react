## 0.2.0 (February 4th, 2018)
This version is the first major application overhaul. Below is a (nearly) complete list of changes:
### Major Features
- __Challenge Testing:__ By far the biggest and most important change, when this feature is enabled, every time you run your code, a test suite will run in the background, and the results will log to the console. __NOTE:__ Tests are disabled by default to keep unwanted noise in the console down to a minimum. Delete the `// SUPPRESS TESTS` comment to enable. __NOTE 2:__ Some data structures have had property names changed, and the tests look for these property names. Checks are built in to warn users about this if their solutions use old property names.
- __App Testing:__ In addition to this, testing has been added for the solutions themselves: running `yarn run test` or `npm run test` will verify that all solution code passes the tests for each challenge (this actually caught some minor bugs in my solutions!), that the seed code is valid (does not contain errors), and that test coverage is complete for each section.
- __New / Improved Key Bindings:__ Old key bindings only worked with <kbd>CTRL</kbd>, all former shortcut keys, and all new key bindings now work with both <kbd>CTRL</kbd> and <kbd>CMD</kbd> for a more comfortable and familiar experience for Mac users. Also, the following new key bindings have been added:
  - Scroll through themes: <kbd>CMD/CTRL</kbd> + <kbd>ALT</kbd> + (<kbd>{</kbd> OR <kbd>}</kbd>)
  - Jump to solution / seed: <kbd>CMD/CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>S</kbd>
  - Toggle Suppress Tests: <kbd>CMD/CTRL</kbd> + <kbd>ALT</kbd> + <kbd>/</kbd>
  - Clear Console: <kbd>ALT</kbd> + <kbd>SHIFT</kbd> + <kbd>DELTE/BACKSPACE</kbd>
  - Focus Editor: <kbd>CMD/CTRL</kbd> + <kbd>\\</kbd>
- __New Themes:__ 13 new editor and UI themes have been added. See above for key bindings.
- __Editor Enhancements:__ Several CodeMirror capabilities have been enabled to make the coding experience richer and more realistic. New additions include: enable gutter lint markers, autocomplete dialog, search and replace, jump to line, and highlight all matches. Some linter warnings have also been disabled; the `asi` and `laxbreak` rules can be slightly bothersome for ES6 style code. These rules suppress warnings about missing semicolons and ternaries broken up over multiple lines, respectively. New key bindings are below:
  - Open autocomplete dropdown: <kbd>CTRL</kbd> + <kbd>SPACE</kbd>
  - Start searching: <kbd>CMD/CTRL</kbd> + <kbd>F</kbd>
  - Find next: <kbd>CMD/CTRL</kbd> + <kbd>G</kbd>
  - Find previous: <kbd>CMD/CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>G</kbd>
  - Replace: <kbd>CMD</kbd> + <kbd>ALT</kbd> + <kbd>F</kbd> OR <kbd>SHIFT</kbd> + <kbd>CTRL</kbd> + <kbd>F</kbd>
  - Replace all: <kbd>SHIFT</kbd> + <kbd>CMD</kbd> + <kbd>ALT</kbd> + <kbd>F</kbd> OR <kbd>SHIFT</kbd> + <kbd>CTRL</kbd> + <kbd>R</kbd>
  - Jump to line: <kbd>ALT</kbd> + <kbd>G</kbd>
### Minor Features
- __Click to snap console / menu divider:__ To more easily hide the menu or console, double click on the horizontal divider to span the divider to the top bottom or middle.
- __Preserve pane state:__ Pane state / position is now tracked by redux and saved in local storage along with the editor's contents.
- __Prevent unwanted highlighting:__ Prevent unwanted text highlighting / selection in editor when dragging vertical divider. Also disable user selection on "Clear" button.
- __Fix typo on Welcome screen:__ In Welcome.js there was a typo that said `clearCode()` was the function to call in the editor to reset state. This was a typo. `clearState()` clears the application state.
- __Improve `clearState()`:__ Improvements to how this works. Added timeout to prevent accidental resets. Previously, a warning was given if state was about to be reset, but if this key press was an accident, the counter did not reset, and any secondary press, no matter how much later, would have reset the app state. Now, after a few seconds, this resets, so an intentional double-press will always be required to reset state.
- __Fix codeStore bug / improve merge new challenges:__ The biggest change that users won't really feel... there was a serious bug that was causing the code store (editor contents) to be duplicated and stored on each visit. After a while, this had the potential to cause some more serious issues. This was part of some code that was originally intended to help merge newly deployed challenges into the app without the user noticing. There is a fix for this in this update, which removes all duplicates, does not affect any saved code, and improves the overall flow of how new challenges are merged into the existing code store.
- __Improvements to various data structures:__ This update also includes improvements to various data structures, most notably Graph, which has been built out quite a bit. Various methods on other DS have also been improved, including making the default arguments used for recursive methods private. 
