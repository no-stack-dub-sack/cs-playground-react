import { CODE, SOLUTIONS } from '../assets/codeRef';
import WELCOME_MESSAGE from '../assets/seed/welcome';
import { uniqWith, isEqual, replace } from 'lodash';

import {
  NEXT_SNIPPET,
  PREVIOUS_SNIPPET,
  RESET_STATE,
  SELECT_SNIPPET,
  SELECT_SOLUTION,
  UPDATE_CODE
} from '../actions/editor';

// define reducer's initial state
const populateCodeStore = (arr) => {
  for (let category in CODE) {
    CODE[category].forEach(item => {
      arr.push({
        id: replace(item.title, /\s/g, ''),
        userCode: item.seed
      });
    });
  }
  return arr;
}

const initialState = {
  welcome: true,
  current: {
    id: 'Quicksort',
    code: WELCOME_MESSAGE,
    isSolution: false
  },
  codeStore: populateCodeStore([])
};

// reducer's default state is either the initial state or
// is pulled from local storage, which is set in index.js
// each time the user navigates away from the page. user
// may clear localStorage and reset this state by calling
// resetState() in the CodeMirror editor (not a true func)
// the user may also choose to NOT save their code to LS
// by leaving a // DO NOT SAVE single line comment in the
// editor before navigating away from the CSPG application
let defaultState = JSON.parse(
  localStorage.getItem('cs-pg-react-editorState')
) || initialState;

// copy in any newly deployed challenges to state saved
// in localStorage for users not accessing site over HTTPS
// and won't get new content notification from service worker
defaultState.codeStore = uniqWith([
  ...defaultState.codeStore,
  ...initialState.codeStore
], isEqual);

// meaningless abstraction:
const updateUserCode = (state) => {
  if (!state.current.isSolution && !state.welcome) {
    return state.codeStore.map(codeObj => {
      if (state.current.id === codeObj.id) {
        return {
          ...codeObj,
          userCode: state.current.code
        }
      } else {
        return codeObj;
      }
    });
  } else {
    return state.codeStore;
  }
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case RESET_STATE:
      localStorage.removeItem('cs-pg-react-editorState');
      return initialState;
    case UPDATE_CODE:
      return {
        ...state,
        current: {
          ...state.current,
          code: action.code
        }
      }
    case SELECT_SOLUTION:
      for (let id in SOLUTIONS) {
        if (id === action.id) {
          return {
            welcome: false,
            codeStore: updateUserCode(state),
            current: {
              id,
              code: SOLUTIONS[id],
              isSolution: true
            }
          }
        }
      }
      break;
    case SELECT_SNIPPET:
      for (let codeObj of state.codeStore) {
        if (codeObj.id === action.id) {
          return {
            welcome: false,
            codeStore: updateUserCode(state),
            current: {
              id: codeObj.id,
              code: codeObj.userCode,
              isSolution: false
            }
          }
        }
      }
      break;
    case NEXT_SNIPPET:
      for (let i = 0; i < state.codeStore.length; i++) {
        if (state.codeStore[i].id === state.current.id) {
          let next;
          if (state.welcome) next = 0;
          else next = i === state.codeStore.length - 1 ? 0 : i+1;
          return {
            welcome: false,
            codeStore: updateUserCode(state),
            current: {
              id: state.codeStore[next].id,
              code: state.codeStore[next].userCode,
              isSolution: false
            }
          }
        }
      }
      break;
    case PREVIOUS_SNIPPET:
      for (let i = 0; i < state.codeStore.length; i++) {
        if (state.codeStore[i].id === state.current.id) {
          let prev;
          if (state.welcome) prev = 0;
          else prev = i === 0 ? state.codeStore.length - 1 : i-1;
          return {
            welcome: false,
            codeStore: updateUserCode(state),
            current: {
              id: state.codeStore[prev].id,
              code: state.codeStore[prev].userCode,
              isSolution: false
            }
          }
        }
      }
      break;
    default:
      return state;
  }
}
