// @flow
import { ALL_TESTS_SUPPRESSED, EDITR_STATE } from '../utils/localStorageKeys'
import { CODE, SOLUTIONS } from '../assets/codeRef'
import { findIndex, indexOf, map } from 'lodash'

import type { Action } from '../types/Actions'
import type { State } from './repls'
import WELCOME_MESSAGE from '../assets/seed/welcome'
import checkForUpdates from './utils/checkForUpdates'
import createOrderKey from './utils/createOrderKey'
import populateCodeStore from './utils/populateCodeStore'
import repls from './repls'

const initialState: State = {
  isSharedRepl: false,
  current: {
    id: 'welcome',
    code: WELCOME_MESSAGE,
    isSolution: false
  },
  codeStore: populateCodeStore(CODE),
  orderKey: createOrderKey(CODE)
}

// reducer's default state is either initialState
// or rehydrated from LS, which is set in index.js
const hydrate = localStorage.getItem(EDITR_STATE)
export const defaultState: State = hydrate
  ? checkForUpdates(initialState, hydrate, CODE)
  : initialState

const updateCodeStore = (state: State, newCode) => {
  if (!state.current.isSolution && state.current.id !== 'welcome') {
    return map(state.codeStore, challenge => {
      if (state.current.id === challenge.id) {
        return {
          ...challenge,
          userCode: newCode
        }
      } else {
        return challenge
      }
    })
  } else {
    return state.codeStore
  }
}

const editor = (state: State = defaultState, action: Action) => {
  switch(action.type) {
    case 'LOAD_SHARED_REPL':
    case 'ADD_REPL':
    case 'DELETE_REPL':
      return repls(state, action)
    case 'RESET_STATE':
      localStorage.removeItem(EDITR_STATE)
      localStorage.removeItem(ALL_TESTS_SUPPRESSED)
      return initialState
    case 'UPDATE_CODE':
      return {
        ...state,
        codeStore: updateCodeStore(state, action.code),
        current: {
          ...state.current,
          code: action.code
        }
      }
    case 'SELECT_SOLUTION':
      return {
        ...state,
        current: {
          id: action.id,
          code: SOLUTIONS[action.id],
          isSolution: true
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
    case 'TOGGLE_SOLUTION':
      if (!SOLUTIONS[state.current.id])
        return state
      return !state.current.isSolution
        ? editor(state, { type: 'SELECT_SOLUTION', id: state.current.id })
        : editor(state, { type: 'SELECT_CHALLENGE', id: state.current.id })
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
    default:
      return state
  }
}

export default editor
