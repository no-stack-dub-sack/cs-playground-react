// remove all comments from user code to avoid running into weird edge
// cases when running check for LOOPS regex. Only running loop-protect
// if loops are actually present in code (due to weird bug when run on
// code with no loops), so must have this check. Edge case examples:

/*

  const LOOPS = new RegExp(/(?:\bwhile|\bfor)\s*?\(.*?\)/)
  code = `
  // while something is happening, run myFunc
  myFunc()
  `
  LOOPS.test(code) // true
  // in this example, the word 'while' in the comment, plus the '()' from myFunc()
  // causes a false positive. There is no while loop, but it thinks there is

  // the regexp can not be more strict, because the following is a valid loop.
  // so we need to go over multiple lines, but be sure theres nothing but spaces
  // between the 'while' or 'for' keywords and the parens, hence trim comments

  var i = 0
  while
  /* silly comments don't belong here
  but, you never know who might put
  theme here * / (i<5) i++

*/

export default (code) => {
  // arbitrarily complex markers to avoid replacing user code
  const ML_COMMENT_BEGIN = 'Ω≈≈__CS_PG_~_BEGIN_ML_~_CS_PG__≈≈Ω'
  const ML_COMMENT_BODY  = 'Ω≈≈__CS_PG_~_ML__BODY_~_CS_PG__≈≈Ω'

  code = code.split('\n')

  for (let line = 0; line < code.length; line++) {

    // handle  inline comments
    if (/\/\//.test(code[line])) {
      const index = code[line].indexOf('//')
      code[line] = code[line].slice(0, index)
    }

    // handle /**/ comments on a single line
    if (/\/\*.*\*\//.test(code[line])) {
      const startIndex = code[line].indexOf('/*')
      const terminatorIndex = code[line].indexOf('*/')+1
      code[line] = code[line].slice(0, startIndex) + ' ' +
        code[line].slice(terminatorIndex+1)
    }

    // handle beginning of multi-line comments and mark spot
    if (/\/\*/.test(code[line]) && !/\*\//.test(code[line])) {
      code[line] = code[line].replace(/\/*\/.*/, ML_COMMENT_BEGIN)
    }

    // if previous line is part of ml-comment
    if (
      code[line-1] === ML_COMMENT_BODY ||
      RegExp(ML_COMMENT_BEGIN).test(code[line-1])
    ) {
        // if no terminator, mark as comment body
        if (!/\*\//.test(code[line])) {
          code[line] = ML_COMMENT_BODY
        } else {
          // if comment ends on this line, remove
          code[line] = code[line].replace(/(\s*).*\*\//, '$1')
        }
    }
}

// filter off lines marked as comment body, join back into
// code string, and replace multi-line comment beginning
// markers to now have completely comment free code

return code
  .filter(line => line !== ML_COMMENT_BODY)
  .join('\n')
  .replace(RegExp(ML_COMMENT_BEGIN, 'g'), '')
}
