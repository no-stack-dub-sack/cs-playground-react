import * as types from '../actions/types'
import { ALL_TESTS_SUPPRESSED, EDITR_STATE } from '../utils/localStorageKeys'
import { CODE, SOLUTIONS } from '../assets/codeRef'
import { findIndex, indexOf, map } from 'lodash'
import checkForUpdates from './utils/checkForUpdates'
import createOrderKey from './utils/createOrderKey'
import populateCodeStore from './utils/populateCodeStore'
import WELCOME_MESSAGE from '../assets/seed/welcome'

const initialState = {
  isSharedRepl: false,
  current: {
    id: 'welcome',
    code: WELCOME_MESSAGE,
    isSolution: false
  },
  codeStore: populateCodeStore(CODE),
  orderKey: createOrderKey(CODE)
}

// reducer's default state is either the initial state or
// is pulled from local storage, which is set in index.js
let defaultState = JSON.parse(
  localStorage.getItem(EDITR_STATE)
) || initialState

// check for newly added challenges and merge codeStores
defaultState = checkForUpdates(initialState, defaultState, CODE)

const updateCodeStore = (state, newCode) => {
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

const editor = (state = defaultState, action) => {
  switch(action.type) {
    case types.RESET_STATE:
      localStorage.removeItem(EDITR_STATE)
      localStorage.removeItem(ALL_TESTS_SUPPRESSED)
      return initialState
    case types.LOAD_SHARED_REPL:
      return {
        ...state,
        isSharedRepl: true,
        current: {
          id: 'sharedRepl',
          code: action.code,
          isSolution: false
        }
      }
    case types.UPDATE_CODE:
      return {
        ...state,
        codeStore: updateCodeStore(state, action.code),
        current: {
          ...state.current,
          code: action.code
        }
      }
    case types.SELECT_SOLUTION:
      return {
        ...state,
        current: {
          id: action.id,
          code: SOLUTIONS[action.id],
          isSolution: true
        }
      }
    case types.SELECT_CHALLENGE:
      let idx = findIndex(state.codeStore, { id: action.id })
      return {
        ...state,
        current: {
          id: action.id,
          code: state.codeStore[idx].userCode,
          isSolution: false
        }
      }
    case types.TOGGLE_SOLUTION:
      if (!SOLUTIONS[state.current.id])
        return state
      return !state.current.isSolution
        ? editor(state, { type: types.SELECT_SOLUTION, id: state.current.id })
        : editor(state, { type: types.SELECT_CHALLENGE, id: state.current.id })
    case types.NEXT_CHALLENGE: {
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
    case types.PREV_CHALLENGE: {
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
    case types.ADD_REPL:
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
    case types.DELETE_REPL:
      const prev = indexOf(state.orderKey, action.id) - 1
      return {
        ...state,
        codeStore: state.codeStore.filter(repl =>
          repl.id !== action.id),
        orderKey: state.orderKey.filter(repl =>
          repl !== action.id),
        current: {
          id: state.codeStore[prev].id,
          code: state.codeStore[prev].userCode,
          isSolution: false
        }
      }
    default:
      return state
  }
}

export default editor
