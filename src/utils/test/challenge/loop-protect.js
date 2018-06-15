const Babel   = require('babel-standalone')
const protect = require('loop-protect')

function error(line, char) {
  throw new RangeError(
`Potential infinite loop, timed out after 200ms.
    at eval:${line}:${char}
    at eval

NOTE: You can disable this feature with <code>// DISABLE LOOP PROTECT</code>`
  )
}

export default (code) => {
  const timeout = 200
  Babel.registerPlugin('loopProtection', protect(timeout, error))
  const transform = source => Babel.transform(source, {
    plugins: ['loopProtection'],
  }).code
  return transform(code)
}
