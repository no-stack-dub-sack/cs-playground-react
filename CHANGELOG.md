## 0.3.2 (August, 25th, 2019)
Small update:
- small fix to BST solution thanks to @mansisce
- rewrite HashTable solution to make much more sense and provide a more practical real-world example
- remove HashTable challenge tests until new ones can be written
- add new HashTable resources

## 0.3.1 (June 15th, 2018)
Small update including minor fixes (typos, etc.). Also:
- fix 'all of a sudden' babel-standalone bug catching syntax error in loop protect code (that didn't seem to exist), was causing issues with executing code on Chrome for windows (not on Mac for some reason?)
- add ability to toggle loop-protect via key binding
- improve logic that handles toggling control comments via keybindings

## 0.3.0 (April 9th, 2018)
A pretty major update including a few big new features, and one smaller but important one:
- __Awesome, more modern menu UI and theme updates:__ Thanks to @IssaacAbrahamson for coming through on this one! Way better design skills than me, and the menu looks freaking great! So much better...
- __User Created REPLs:__ Added ability to add user-created REPLs. Scroll to the bottom of the sidebar menu and press the <kbd>+</kbd> icon to get started. Also built in toasts for notifications about creating multiple REPLs with the same name: not allowed.
- __Generate Share Links__  Added ability to generate share link to link to a new instance of CS-PG-React which will contain the current contents of the editor. Expand the hamburger menu to the right of the console and click the Share icon to generate a link. Click the toast to copy it to the clipboard automatically. This action can also be triggered from the keyboard using
 <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>+</kbd>. __NOTE:__ changes made in a shared repl will not be saved to local storage to prevent accidental overwrites. This feature utilizes the newly created CS-PG-React API to fetch and transmit editor contents, which are stored in a MongoDB backend. MongoIDs are used as URL params to indicate to CS-PG-React which mode to open in. API prevents duplicate strings, so only unique editor contents will be stored. The API lives in a separate repo, and needs some major improvements, most notably authorization & security (though this is a relatively small concern until the user base grows.)
- __Key Bindings Modal:__ CS-Playground-React has many key bindings and shortcut keys, many of which are probably unknown to the average user. Added a button to the hamburger menu which triggers a modal showing a full list of key bindings.

## 0.2.2 (February 11th, 2018)
Add a coupe of new challenges, improve loop protection:
- __Loop Protection:__ Update loop-protect logic so that console is not silenced during check for bad loops as it was originally due to weird bug. Added a workaround so that loop-protect can be applied at time of eval - needed to remove all comments to accurately test code string against regexp for presence of loops. Add one hack, remove another! Thanks again to @btruhand for pointing out the need for this fix, ability to debug is important!
- __Add Reverse a String Challenge:__ thanks @garroadran!
- __Add Reverse Vowels Challenge__

## 0.2.1 (February 6th, 2018)
One big change, two small ones:
- __Loop Protection:__ Thanks to a suggestion from a user, a much needed infinite loop protect feature has been added. Makes use of [babel-standalone](https://github.com/babel/babel-standalone) and [jsbin/loop-protect](https://github.com/jsbin/loop-protect) with a customization to throw an error instead of just breaking the loop so the user is aware of the problem. Previous to this, app would just crash.
- __Fix Flatten An Array Challenge:__ The flatten an array challenge was passing all tests with no code! Whoops, forgot to call the IIFEs. This is fixed in this version.
- __Theme Updates:__ The Paraiso-Light theme has been updated so that the console and buttons are also themed. Looks nice :smile:. Also, darkened cursor on other light themes.

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
