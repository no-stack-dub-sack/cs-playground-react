import { combineReducers } from 'redux'
import console from './console'
import editor from './editor/editor'
import menu from './menu'
import modal from './modal'
import panes from './panes'
import theme from './theme'

const reducers = {
  console,
  editor,
  modal,
  panes,
  theme,
  menu
}

export type Reducers = typeof reducers
export default combineReducers(reducers)
