import { IS_SUITE_SUPPRESSED } from './localStorageKeys'
import { store } from '../index';

export default function(cm) {
  let isDisabled = JSON.parse(
    localStorage.getItem(IS_SUITE_SUPPRESSED)
  )
  let id = store.getState().editor.current.id
  if (isDisabled[id]) {
    cm.eachLine(line => {
      if (line && line.text.includes('// SUPPRESS TESTS')) {
        cm.setCursor(line.lineNo())
        cm.execCommand('deleteLine')
        cm.execCommand('goLineEnd')
      }
    })
    isDisabled[id] = false
  } else {
    const { line } = cm.getCursor()
    if (!/^\s*$/.test(cm.getLine(line))) {
      cm.execCommand('goLineEnd')
      cm.execCommand('newlineAndIndent')
    }
    cm.replaceSelection('// SUPPRESS TESTS')
    isDisabled[id] = true
  }
  localStorage.setItem(
    IS_SUITE_SUPPRESSED,
    JSON.stringify(isDisabled)
  )
}
