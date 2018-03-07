// @flow
import { filter, indexOf } from 'lodash'

import type { Action } from '../../../types/Actions'
import type { EditorState } from '../../../types/Editor'

export default (state: EditorState, action: Action): EditorState => {
  switch (action.type) {
    case 'LOAD_SHARED_REPL':
      return {
        ...state,
        isSharedRepl: true,
        current: {
          id: 'sharedRepl',
          code: action.code,
          isSolution: false
        }
      }
    case 'ADD_REPL':
      return {
        ...state,
        current: {
          id: action.id,
          code: '',
          isSolution: false
        },
        orderKey: [
          ...state.orderKey,
          action.id
        ],
        codeStore: [
          ...state.codeStore,
          {
            id: action.id,
            userCode: ''
          }
        ]
      }
    case 'DELETE_REPL':
      const id = action.id
      const prev = indexOf(state.orderKey, id) - 1
      return {
        ...state,
        codeStore: filter(state.codeStore, repl =>
          repl.id !== id),
        orderKey: filter(state.orderKey, repl =>
          repl !== id),
        current: {
          id: state.codeStore[prev].id,
          code: state.codeStore[prev].userCode,
          isSolution: false
        }
      }
    default: return state
  }
}
