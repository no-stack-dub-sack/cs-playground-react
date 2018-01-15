export default {
   indentUnit: 4,
   foldGutter: true,
   lineNumbers: true,
   matchBrackets: true,
   styleActiveLine: true,
   autoCloseBrackets: true,
   theme: 'tomorrow-night-eighties',
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
     laxbreak: true
   },
   extraKeys: {
     // prevent default
     'Ctrl-Enter': () => {
       return false;
     },
     // prevent default
     'Cmd-Enter': () => {
       return false;
     }
   }
}
