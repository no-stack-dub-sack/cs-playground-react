// NOTE: needed to add extra helper before babel transform and check for infinite
// loops first instead of calling loopProtect funct directly when code is eval'd.
// When called directly it caused very strange behavior with loop-free code. But
// when code is eval'd alone, works as expected, hence the extra step seen below.

// use babel and loop-protect to transform user code
// into protected loops. Instead of simply breaking the
// loop, add regexp/replace logic to throw error & warn user

export const loopProtect = (code) => {
  // choose arbitrarirly complex number
  // to avoid accidental regexp matches
  // & later replace with round number
  const timeout = 500.235621347687320983287
  const roundTo = Math.round(timeout)
  const Babel = require('babel-standalone')
  const protect = require('loop-protect')

  Babel.registerPlugin('loopProtection', protect(timeout))
  const transform = source => Babel.transform(source, {
    plugins: ['loopProtection'],
  }).code

  const error = `Error('Timed out after ${roundTo}ms due to an infinite loop. Check your code and try again.')`
  const _this = new RegExp(`> ${timeout}\\)\\sbreak;`, 'g')
  const withThis = `> ${roundTo}) throw new ${error}`

  return transform(code).replace(_this, withThis)
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
