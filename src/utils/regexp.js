// regexp constructors
export const RESET_STATE = new RegExp('resetState\\(\\)')
export const SUPPRESS_TESTS = new RegExp('\\/\\/\\s\\s?SUPPRESS\\s\\s?TESTS', 'i')
export const DO_NOT_SAVE = new RegExp('\\/\\/\\s\\s?DO\\s\\s?NOT\\s\\s?SAVE', 'i')
export const ERROR_TYPES = new RegExp('tests failed|WARNING:|Fail:|AssertionError|InternalError|RangeError|ReferenceError|EvalError|SyntaxError|TypeError|URIError')
