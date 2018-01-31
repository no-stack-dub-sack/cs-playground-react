import { combineReducers } from 'redux'
import editor from './editor'
import console from './console'
import modal from './modal'
import panes from './panes'
import theme from './theme'

const rootReducer = combineReducers({
  editor,
  console,
  modal,
  panes,
  theme
})

export default rootReducer
