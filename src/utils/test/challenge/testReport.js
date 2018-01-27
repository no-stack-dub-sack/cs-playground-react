const logTestReport = (numPassed, numDisabled, tests) => {
  console.log('\nREPORT:')
  console.log('‾‾‾‾‾‾‾')
  console.log(`- ${numPassed} out of ${tests.length} tests passed`)
  console.log(`- ${tests.length - numPassed} out of ${tests.length} tests failed`)
  console.log(`<code>- ${numDisabled} test${numDisabled === 1 ? '' : 's'} disabled (define method to enable)</code>`)
  console.log('\n/***** TESTS END *****/\n')
}

const beginTests = '\n/***** TESTS BEGIN *****/\n'

module.exports = { logTestReport, beginTests }
