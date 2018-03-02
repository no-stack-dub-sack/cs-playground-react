import { combineReducers } from 'redux'
import console from './console'
import editor from './editor'
import modal from './modal'
import panes from './panes'
import theme from './theme'
import menu from './menu'

const rootReducer = combineReducers({
  console,
  editor,
  modal,
  panes,
  theme,
  menu
})

export default rootReducer
