import * as types from '../actions/types'
import { THEME_STATE } from '../utils/localStorageKeys'
import { head, indexOf, last } from 'lodash'

const initialState = {
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
    'twilight',
  ]
}

const defaultState = JSON.parse(
  localStorage.getItem(THEME_STATE)
) || initialState

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.NEXT_THEME: {
      const idx = state.current === last(state.themes)
        ? 0
        : indexOf(state.themes, state.current)+1
      return {
        ...state,
        current: state.themes[idx]
      }
    }
    case types.PREV_THEME: {
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
