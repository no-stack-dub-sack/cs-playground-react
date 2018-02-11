const Babel   = require('babel-standalone')
const protect = require('loop-protect')

const error = num => {
  throw new Error(
    `Timed out after 500ms due to infinite loop on line ${num}`
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
