// @flow
import { filter, indexOf } from 'lodash'

import type { Action } from '../types/Actions'
import { defaultState } from './editor'

export type Challenges = {
  id: string,
  userCode: string
}

export type State = {
  isSharedRepl: boolean,
  current: {
    id: string,
    code: string,
    isSolution: boolean
  },
  codeStore: Array<Challenges>,
  orderKey: Array<string>
}

export default (state: State = defaultState, action: Action) => {
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
