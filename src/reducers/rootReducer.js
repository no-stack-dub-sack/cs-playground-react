import { combineReducers } from 'redux';
import editor from './editor';
import console from './console';
import modal from './modal';
import panes from './panes';

const rootReducer = combineReducers({
  editor,
  console,
  modal,
  panes
});

export default rootReducer;
