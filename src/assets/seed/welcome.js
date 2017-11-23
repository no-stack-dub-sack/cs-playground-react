export default
`WELCOME TO CS PLAYGROUND REACT!
===============================

This app is a simple \`JavaScript sandbox\` designed to help you prepare for programming
interviews or just to help you brush up on your \`CS fundamentals\`. This covers just the
basics: common \`sorting algorithms\`, some basic and advanced \`data structures\`, and
some cool algorithm challenges \`just for fun\`. The contents are a work in progress, and
you can expect to see some additional topics covered in the future! In addition to seed
code to get you started and solution code to compare your solutions to, there are also
lists of \`pre-compiled resources\` for each topic: in-depth articles & tutorials,
wikipedia links, and even links to interactive challenges.

If you're interested in contributing, if you find any bugs, or if you just want to check out
the codebase, the repo lives [here](https://github.com/no-stack-dub-sack/cs-playground-react).

Have fun, thanks for visiting, and Happy Coding!

# A couple of tips about the app:

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
can simply call the \`resetCode()\` function in the editor, and click 'Run Code'. You will be
prompted with a warning once in the in-browser "mock" console, before the code is actually deleted.


- _NOT SAVING CODE_
If for some reason you do not want your code to persist to the next session, just leave a
single line DO NOT SAVE comment in the editor before you navigate away, e.g. \`// DO NOT SAVE\`


- _CLEARING THE CONSOLE_
The console messages will be cleared automatically when yo switch to a new problem and run your
code, but if you want to clear it at any time, just run your code calling \`clearConsole()\`.


- _SHORTCUT KEYS_
Some basic hotkeys are built in to help you navigate:

__Next Problem:__      |   \`CTRL + SHIFT + >\`
__Previous Problem:__  |   \`CTRL + SHIFT + <\`
__Run Code:__          |   \`CTRL + SHIFT + Enter\`


- _KEY BINDINGS_
The CodeMirror instance is set up with Sublime key bindings.


- _CHALLENGE!_
Some of my solutions are less than perfect. If you come up with a better one, or want to
add a new algorithm or data structure that I haven't covered, feel free to submit a PR!
`
