import editor from './editor';
import { combineReducers } from 'redux';
import consoleOutput from './console';
import modal from './modal';
import resources from './resources';

const rootReducer = combineReducers({
  editor,
  consoleOutput,
  modal,
  resources
});

export default rootReducer;
