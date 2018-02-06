export default
`WELCOME TO CS PLAYGROUND REACT!
===============================

This app is a simple \`JavaScript sandbox\` designed to help you prepare for programming
interviews or just to help you brush up on your \`CS fundamentals\`. This covers just the
basics: common \`sorting algorithms\`, some basic and advanced \`data structures\`, and
some cool algorithm challenges \`just for fun\`. The contents are a work in progress, and
you can expect to see some additional topics covered in the future! In addition to seed
code to get you started, built in tests to test your code, and solution code to compare
your solutions to, there are also lists of \`pre-compiled resources\` for each topic:
in-depth articles & tutorials, wikipedia links, and even links to interactive challenges.

If you're interested in contributing, if you find any bugs, or if you just want to check out
the codebase, the repo lives [here](https://github.com/no-stack-dub-sack/cs-playground-react).

Have fun, thanks for visiting, and Happy Coding!

- _TEST SUITES_
Each challenge has an accompanying test suite to help you be sure that your solutions are correct.
Each time you run your code, the tests will be run in the background and the results will be logged
to the console. Note that the tests are purely optional, and are disabled by default. This is to keep
unwanted noise in the console down to a minimum, and to not force you to solve these problems in a
specific way. Like most things in programming, each of these problems have several different solutions.
In order to test them, I had to pick one way to solve each, and test for that way. This might be limiting
if you want to choose an completely different approach to solving a particular problem. To enable the tests,
delete the \`// SUPPRESS TESTS\` comment at the bottom of the seed file (or you can use the shortcut keys:
\`CMD-ALT-/\` or \`CTRL-ALT-/\`, which will toggle the \`// SUPPRESS TESTS\` comment at any time).


- _DISABLED TESTS_
When the test suite for a particular problem is running, you may notice that some tests are disabled by
default. This is mainly for really complicated data structure problems. Some tests are not required to
ensure a fundamental understanding of a particular data structure, but still might be fun to solve anyway!
So when this is the case, these tests are disabled, and are only enabled when you define the method in
question on the class. If you don't define the method, they won't be tested, and not solving these problems
won't count against you, or show up as a pesky, red, failing test.


- _SAVING CODE_
As you work on problems, don't worry about moving from one
to the other, your code will be saved in a couple of ways:
  1) First, during each session, any NON-SOLUTION code that you
     edit will be persisted by React and Redux. Feel free to mess around with the solutions,
     however, any changes that you make there WILL NOT be saved.
  2) Second, even if you navigate away from the page or close your browser, your code will be
     persisted by localStorage. NOTE that this is only true until your browser's localStorage
     and/or is cleared!


- _RESETTING CODE_
To re-initialize the global state of the application (and clear all of your saved code), you
can simply call the \`resetState()\` function in the editor, and click 'Run Code'. You will be
prompted with a warning once in the in-browser "mock" console, before the state is actually reset.


- _NOT SAVING CODE_
If for some reason you do not want your code to persist to the next session, just leave a
single line DO NOT SAVE comment in the editor before you navigate away, e.g. \`// DO NOT SAVE\`


- _CLEARING THE CONSOLE_
The console messages will be cleared automatically when you switch to a new problem and run your
code, but if you want to clear it at any time, just hit the button, or press \`ALT-SHIFT-BACKSPACE\`!


- _KEY BINDINGS_
The CodeMirror instance is set up with SublimeText key bindings.


- _ADDITIONAL KEY BINDINGS_
Some additional key bindings are built in to help you navigate:

 Scroll thru themes:     |\`   CMD-ALT-{ & CMD-ALT-} or CTRL-ALT-{ & CTRL-ALT-}
\`Next Challenge:         |\`   CMD-SHIFT-. or CTRL-SHIFT-,
\`Previous Challenge:     |\`   CMD-SHIFT-. or CTRL-SHIFT-,
\`Jump to Solution:       |\`   CMD-SHIFT-S or CTRL-SHIFT-S
\`Run Code / Tests:       |\`   CMD-SHIFT-ENTER or CTRL-SHIFT-ENTER
\`Toggle Suppress Tests:  |\`   CMD-ALT-/ or CTRL-ALT-/
\`Clear Console:          |\`   ALT-SHIFT-BACKSPACE
\`Open Autocomplete:      |\`   CTRL-SPACE
\`Focus Editor:           |\`   CMD-\\ or CTRL-\\
\`

Primitive CodeMirror search and replace functionalities:

 Start searching:        |\`   CTRL-F or CMD-F
\`Find next:              |\`   CTRL-G or CMD-G
\`Find previous:          |\`   SHIFT-CTRL-G or SHIFT-CMD-G
\`Replace:                |\`   SHIFT-CTRL-F or CMD-ALT-F
\`Replace all:            |\`   SHIFT-CTRL-R or SHIFT-CMD-ALT-F
\`Jump to line:           |\`   ALT-G
\`

- _CHALLENGE!_
Some of my solutions are less than perfect. If you come up with a better one, or want to
add a new algorithm or data structure that I haven't covered, feel free to submit a PR!

- _HELPFUL LINKS_
  - [README](https://github.com/no-stack-dub-sack/cs-playground-react/blob/master/README.md)
  - [CONTRIBUTING](https://github.com/no-stack-dub-sack/cs-playground-react/blob/master/CONTRIBUTING.md)
  - [CHANGELOG](https://github.com/no-stack-dub-sack/cs-playground-react/blob/master/CHANGELOG.md)
  - [NEW ISSUE](https://github.com/no-stack-dub-sack/cs-playground-react/issues/new)
`
