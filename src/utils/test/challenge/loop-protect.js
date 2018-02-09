const Babel   = require('babel-standalone')
const protect = require('loop-protect')

// NOTE: needed to add extra helper before babel transform and check for infinite
// loops first instead of calling loopProtect funct directly when code is eval'd.
// When called directly it caused very strange behavior with loop-free code. But
// when code is eval'd alone, works as expected, hence the extra step seen below.

const error = num => {
  throw new Error(
    `Timed out after 500ms due to infinite loop on line ${num}`
  )
}

const loopProtect = (code) => {
  const timeout = 500
  Babel.registerPlugin('loopProtection', protect(timeout, error))
  const transform = source => Babel.transform(source, {
    plugins: ['loopProtection'],
  }).code
  return transform(code)
}

// disable console during loop-protect to avoid
// logging 500ms worth of erroneous logs and to
// prevent double logs when code is ∞ loop free
export default (code) => {
  let isOk = true, error
  const oldConsoleLog = console.log
  console.log = () => null

  try {
    // eslint-disable-next-line
    eval(loopProtect(code))
  } catch (e) {
    isOk = false
    error = e.toString()
  } finally {
    console.log = oldConsoleLog
    error && console.log(error)
  }

  return isOk
}
