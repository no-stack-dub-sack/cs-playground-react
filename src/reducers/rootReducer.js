import { combineReducers } from 'redux';
import snippets from './snippets';
import consoleOutput from './console';

const rootReducer = combineReducers({
  snippets,
  consoleOutput
});

export default rootReducer;
