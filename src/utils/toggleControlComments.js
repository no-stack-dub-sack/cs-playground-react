import { store } from '../index';
import { IS_LOOP_PROTECT_DISABLED, IS_SUITE_SUPPRESSED } from './localStorageKeys';

export default function(cm, regexp, replaceText) {

  const KEY = replaceText === '// DISABLE LOOP PROTECT'
    ? IS_LOOP_PROTECT_DISABLED
    : IS_SUITE_SUPPRESSED

  let isDisabled = JSON.parse(
    localStorage.getItem(KEY)
  )

  // isTestsSuppressed map is initialized, init loopProtect here
  if (!isDisabled && replaceText === '// DISABLE LOOP PROTECT') {
  	isDisabled = {}
  }

  // get id of current challenge to create
  // lookup table of toggle state per challenge
  let id = store.getState().editor.current.id
  let finished = false

  // first search for match, if match exists, remove,
  // set disabled to true, and update local storage map
  cm.eachLine(line => {
  	if (line && line.text.match(regexp)) {
  		cm.setCursor(line.lineNo())
  		cm.execCommand('deleteLine')
  		cm.execCommand('goLineEnd')
  		isDisabled[id] = true
  		finished = true
  	}
  })

  // no match was found, add control comment
  // at cursor position and add new line
  if (!finished) {
    const {
      line
    } = cm.getCursor()
    if (!/^\s*$/.test(cm.getLine(line))) {
      cm.execCommand('goLineEnd')
      cm.execCommand('newlineAndIndent')
    }
    cm.replaceSelection(replaceText)
    isDisabled[id] = true
  }

  // commit updated map to local storage
  localStorage.setItem(
    KEY,
    JSON.stringify(isDisabled)
  )
}
