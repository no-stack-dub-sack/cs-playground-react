import toggleControlComments from './toggleControlComments';

export default {
  indentUnit: 4,
  foldGutter: true,
  lineNumbers: true,
  matchBrackets: true,
  styleActiveLine: true,
  autoCloseBrackets: true,
  highlightSelectionMatches: true,
  mode:  "javascript",
  keyMap: 'sublime',
  gutters: [
    'CodeMirror-linenumbers',
    'CodeMirror-foldgutter',
    'CodeMirror-lint-markers'
  ],
  lint: {
    // allow ES6 syntax
    esversion: 6,
    // suppress multi-line ternary warnings
    laxbreak: true,
    // suppress missing semi-colon warnings
    asi: true
  },
  extraKeys: {
    // prevent default
    'Ctrl-Enter': () => {
      return false
    },
    // prevent default
    'Cmd-Enter': () => {
      return false
    },
    'Ctrl-Space': (cm) => {
      cm.showHint()
    },
    'Ctrl-Alt-/': (cm) => {
      toggleControlComments(cm, /\/\/\s+SUPPRESS\s+TESTS/i, '// SUPPRESS TESTS')
    },
    'Cmd-Alt-/': (cm) => {
      toggleControlComments(cm, /\/\/\s+SUPPRESS\s+TESTS/i, '// SUPPRESS TESTS')
    },
    'Ctrl-Alt-L': (cm) => {
    	toggleControlComments(cm, /\/\/\s+DISABLE\s+LOOP\s+PROTECT/i, '// DISABLE LOOP PROTECT')
    },
  }
}
