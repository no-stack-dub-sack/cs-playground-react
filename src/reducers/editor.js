import * as types from '../actions/types'
import { CODE, SOLUTIONS } from '../assets/codeRef'
import { composeCodeStore, createOrderKey, populateCodeStore } from './utils'
import { EDITR_STATE, ALL_TESTS_SUPPRESSED } from '../utils/localStorageKeys'
import { concat, findIndex, indexOf, map, uniq } from 'lodash'
import WELCOME_MESSAGE from '../assets/seed/welcome'


const initialState = {
  welcome: true,
  current: {
    id: 'Quicksort',
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


// if lengths differ, call composeCodeStore to merge in
// new challenges and/or remove dupes from previous bug
if (initialState.codeStore.length !== defaultState.codeStore.length) {
  const { codeStore, current } = composeCodeStore(initialState, defaultState)
  defaultState.codeStore = codeStore
  defaultState.current = current
  // preserve user added repls in order key when updating code store
  const oldOrderKey = defaultState.orderKey
  defaultState.orderKey = uniq(concat(createOrderKey(CODE), oldOrderKey))
}


// meaningless abstraction:
const updateUserCode = (state) => {
  if (!state.current.isSolution && !state.welcome) {
    return map(state.codeStore, challenge => {
      if (state.current.id === challenge.id) {
        return {
          ...challenge,
          userCode: state.current.code
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
    case types.UPDATE_CODE:
      return {
        ...state,
        current: {
          ...state.current,
          code: action.code
        }
      }
    case types.SELECT_SOLUTION:
      return {
        ...state,
        welcome: false,
        codeStore: updateUserCode(state),
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
        welcome: false,
        codeStore: updateUserCode(state),
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
      let next = (state.welcome || i === orderKey.length - 1) ? 0 : i+1
      next = findIndex(state.codeStore, { id: orderKey[next] })
      return {
        ...state,
        welcome: false,
        codeStore: updateUserCode(state),
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
      let prev = (state.welcome || i === 0) ? orderKey.length - 1 : i-1
      prev = findIndex(state.codeStore, { id: orderKey[prev] })
      return {
        ...state,
        welcome: false,
        codeStore: updateUserCode(state),
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
