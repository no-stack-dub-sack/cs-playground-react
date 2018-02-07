export default (code) => {
  const timeout = 500
  const Babel = require('babel-standalone')
  const protect = require('loop-protect')

  Babel.registerPlugin('loopProtection', protect(timeout))
  const transform = source => Babel.transform(source, {
    plugins: ['loopProtection'],
  }).code

  const error = `Error('Timed out after ${timeout}ms due to an infinite loop. Check your code and try again.')`
  const _this = new RegExp(`if \\(Date\\.now\\(\\) - _LP > ${timeout}\\)\\s+break;`)
  const withThis = `if (Date.now() - _LP > ${timeout}) throw new ${error}`

  // use babel and loop-protect to transform user code
  // into protected loops. Instead of simply breaking the
  // loop, add replacement logic to throw error to warn user
  return transform(code).replace(_this, withThis)
}
