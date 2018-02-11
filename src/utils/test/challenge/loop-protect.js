const Babel   = require('babel-standalone')
const protect = require('loop-protect')

const error = (line, char) => {
  throw new Error(
`Potential infinite loop, timed out after 500ms.
    at eval:${line}:${char}
    at eval`
  )
}

export default (code) => {
  const timeout = 500
  Babel.registerPlugin('loopProtection', protect(timeout, error))
  const transform = source => Babel.transform(source, {
    plugins: ['loopProtection'],
  }).code
  return transform(code)
}
