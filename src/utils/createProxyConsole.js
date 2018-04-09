// @flow
import { disableProxyConsole, store } from '../index'
import { join, map } from 'lodash'

import { consoleLog } from '../actions/console'

const concatLogs = (arr: mixed[]): string => {
  return join(
    map(arr, msg => {
      // NOTE: Do not stringify DLL
      if (typeof msg === 'object'
        && msg !== null
        && msg.hasOwnProperty('prev'))
        return msg
      else if (typeof msg !== 'string')
        return JSON.stringify(msg)
      return msg
    }),
    ' '
  )
}

// createProxyConsole
export default () => {
  if (!disableProxyConsole) {
    const OG_Log = console.log
    // $FlowFixMe, ignore
    console.log = function(...args) {
      const logs = concatLogs([...args])
      store.dispatch(consoleLog(logs))
      OG_Log.apply(console, [...args])
    }
  }
}
