import code from './code';
import { combineReducers } from 'redux';
import consoleOutput from './console';
import modal from './modal';
import resources from './resources';

const rootReducer = combineReducers({
  code,
  consoleOutput,
  modal,
  resources
});

export default rootReducer;
