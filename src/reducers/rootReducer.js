import { combineReducers } from 'redux'
import console from './console'
import editor from './editor/editor'
import menu from './menu'
import modal from './modal'
import panes from './panes'
import theme from './theme'

const rootReducer = combineReducers({
  console,
  editor,
  modal,
  panes,
  theme,
  menu
})

export default rootReducer
