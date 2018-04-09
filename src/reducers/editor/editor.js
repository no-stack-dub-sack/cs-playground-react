// @flow
import { ALL_TESTS_SUPPRESSED, EDITR_STATE } from '../../utils/localStorageKeys'

import type { Action } from '../../types/Actions'
import { CODE } from '../../assets/codeRef'
import type { EditorState } from '../../types/Reducers'
import WELCOME_MESSAGE from '../../assets/seed/welcome'
import challengeNav from './children/challenges'
import createOrderKey from './utils/createOrderKey'
import populateCodeStore from './utils/populateCodeStore'
import repls from './children/repls'
import { runInitializationUtils } from './utils/initializationUtils'
import solutionNav from './children/solutions'
import updateCodeStore from './utils/updateCodeStore'

const initialState: EditorState = {
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
const defaultState = runInitializationUtils(
  initialState,
  localStorage.getItem(EDITR_STATE),
  CODE
)

const editor = (state: EditorState = defaultState, action: Action): EditorState => {
  switch(action.type) {
    case 'ADD_REPL':
    case 'DELETE_REPL':
    case 'LOAD_SHARED_REPL':
      return repls(state, action)
    case 'NEXT_CHALLENGE':
    case 'PREV_CHALLENGE':
    case 'SELECT_CHALLENGE':
      return challengeNav(state, action)
    case 'SELECT_SOLUTION':
    case 'TOGGLE_SOLUTION':
      return solutionNav(state, action)
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
    default: return state
  }
}

export default editor
