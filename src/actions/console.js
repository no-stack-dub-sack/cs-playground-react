import _ from 'lodash';
import * as types from './types'
import { store } from '../index'
import { disableProxyConsole } from '../index'

export const clearConsole = () => ({ type: types.CLEAR_CONSOLE })

_.mixin({
  'createLogs': arr =>
  _.join(
    _.map(arr, msg => {
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
})

// createProxyConsole
export default () => {
  if (!disableProxyConsole) {
    const OG_Log = console.log
    console.log = function(...args) {
      const logs = _.createLogs([...args])
      store.dispatch({
        type: types.CONSOLE_LOG,
        logs
      })
      OG_Log.apply(console, [...args])
    }
  }
}
