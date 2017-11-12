import { combineReducers } from 'redux';
import code from './code';
import consoleOutput from './console';
import resources from './resources';
import modal from './modal';

const rootReducer = combineReducers({
  code,
  consoleOutput,
  modal,
  resources
});

export default rootReducer;
