// @flow
import type { Action } from '../types/Actions'
import { PANES_STATE } from '../utils/localStorageKeys';
import type { PanesState } from '../types/Reducers'

const initialState: PanesState = {
  topHeight: '70%',
  bottomHeight: '30%',
  leftWidth: '30%',
  rightWidth: '69.5%',
  transition: 'none',
  clickState: 0
}

// reducer's default state is either initialState
// or rehydrated from LS, which is set in index.js
const hydrate = localStorage.getItem(PANES_STATE)
const defaultState: PanesState = hydrate
  ? JSON.parse(hydrate)
  : initialState

const hidePanes = (state: PanesState): PanesState => {
  switch (state.clickState) {
    case 0:
      return {
        ...state,
        topHeight: '0%',
        bottomHeight: '99%',
        transition: '.5s',
        clickState: 1
      }
    case 1:
      return {
        ...state,
        topHeight: '99%',
        bottomHeight: '0%',
        transition: '.5s',
        clickState: 2
      }
    default:
      return {
        ...state,
        topHeight: '70%',
        bottomHeight: '30%',
        transition: '.5s',
        clickState: 0
      }
  }
}

export default (state: PanesState = defaultState, action: Action): PanesState => {
  switch (action.type) {
    case 'RESET_STATE':
      localStorage.removeItem(PANES_STATE)
      return initialState
    case 'DRAG_HORIZONTAL':
      return {
        ...state,
        leftWidth: action.leftWidth,
        rightWidth: action.rightWidth,
        transition: 'none'
      }
    case 'DRAG_VERTICAL':
      return {
        ...state,
        topHeight: action.topHeight,
        bottomHeight: action.bottomHeight,
        transition: 'none'
      }
    case 'DOUBLE_CLICK':
      return hidePanes(state)
    default: return state
  }
}
