import { combineReducers } from 'redux';
import code from './code';
import consoleOutput from './console';

const rootReducer = combineReducers({
  code,
  consoleOutput
});

export default rootReducer;
