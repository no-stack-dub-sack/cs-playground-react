// @flow
import { findIndex, indexOf } from 'lodash'

import type { Action } from '../../../types/Actions'
import type { EditorState } from '../../../types/Reducers'

export default (state: EditorState, action: Action): EditorState => {
  switch(action.type) {
    case 'NEXT_CHALLENGE': {
      let { orderKey } = state
      let i = indexOf(orderKey, state.current.id)
      let next = (i === -1 || i === orderKey.length - 1) ? 0 : i+1
      next = findIndex(state.codeStore, { id: orderKey[next] })
      return {
        ...state,
        current: {
          id: state.codeStore[next].id,
          code: state.codeStore[next].userCode,
          isSolution: false
        }
      }
    }
    case 'PREV_CHALLENGE': {
      let { orderKey } = state
      let i = indexOf(orderKey, state.current.id)
      let prev = (i <= 0) ? orderKey.length - 1 : i-1
      prev = findIndex(state.codeStore, { id: orderKey[prev] })
      return {
        ...state,
        current: {
          id: state.codeStore[prev].id,
          code: state.codeStore[prev].userCode,
          isSolution: false
        }
      }
    }
    case 'SELECT_CHALLENGE':
      let idx = findIndex(state.codeStore, { id: action.id })
      return {
        ...state,
        current: {
          id: action.id,
          code: state.codeStore[idx].userCode,
          isSolution: false
        }
      }
    default: return state
  }
}
