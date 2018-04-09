// @flow
import { head, indexOf, isEqual, last } from 'lodash'

import type { Action } from '../types/Actions'
import { THEME_STATE } from '../utils/localStorageKeys'
import type { ThemeState } from '../types/Reducers'

const initialState: ThemeState = {
  current: 'tomorrow-night-eighties',
  themes: [
    'tomorrow-night-eighties',
    'abcdef',
    'base16-dark',
    'base16-light', // light
    'cobalt',
    'eclipse', // light
    'icecoder',
    'lesser-dark',
    'material',
    'monokai',
    'neat', // light
    'panda-syntax',
    'paraiso-light', // light
    'twilight'
  ]
}

// reducer's default state is either initialState
// or rehydrated from LS, which is set in index.js
let hydrate = localStorage.getItem(THEME_STATE)
let defaultState: ThemeState = hydrate
  ? JSON.parse(hydrate)
  : initialState

if (!isEqual(defaultState.themes, initialState.themes)) {
  defaultState = {
    ...defaultState,
    themes: initialState.themes
  }
}

export default (state: ThemeState = defaultState, action: Action): ThemeState => {
  switch (action.type) {
    case 'NEXT_THEME': {
      const idx = state.current === last(state.themes)
        ? 0
        : indexOf(state.themes, state.current)+1
      return {
        ...state,
        current: state.themes[idx]
      }
    }
    case 'PREV_THEME': {
      const idx = state.current === head(state.themes)
        ? state.themes.length-1
        : indexOf(state.themes, state.current)-1
      return {
        ...state,
        current: state.themes[idx]
      }
    }
    default:
      return state
  }
}
