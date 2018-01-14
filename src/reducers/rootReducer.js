import { combineReducers } from 'redux';
import editor from './editor';
import consoleOutput from './console';
import modal from './modal';
import panes from './panes';

const rootReducer = combineReducers({
  editor,
  consoleOutput,
  modal,
  panes
});

export default rootReducer;
