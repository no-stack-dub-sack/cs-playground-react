import editor from './editor';
import { combineReducers } from 'redux';
import consoleOutput from './console';
import modal from './modal';

const rootReducer = combineReducers({
  editor,
  consoleOutput,
  modal,
});

export default rootReducer;
