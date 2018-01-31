import { ARE_TESTS_SUPPRESSED } from './localStorageKeys'

export default function(cm) {
  let are = localStorage.getItem(ARE_TESTS_SUPPRESSED)
  are = are ? JSON.parse(are) : are
  if (are && are.testsDisabled) {
    cm.eachLine(line => {
      if (line && line.text.includes('// SUPPRESS TESTS')) {
        cm.setCursor(line.lineNo())
        cm.execCommand('deleteLine')
        cm.execCommand('goLineEnd')
      }
    })
    localStorage.setItem(
      ARE_TESTS_SUPPRESSED,
      JSON.stringify({
        testsDisabled: false
      })
    )
  } else {
    const { line } = cm.getCursor()
    if (!/^\s*$/.test(cm.getLine(line))) {
      cm.execCommand('goLineEnd')
      cm.execCommand('newlineAndIndent')
    }
    cm.replaceSelection('// SUPPRESS TESTS')
    localStorage.setItem(
      ARE_TESTS_SUPPRESSED,
      JSON.stringify({
        testsDisabled: true
      })
    )
  }
}
