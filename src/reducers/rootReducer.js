import { combineReducers } from 'redux';
import snippets from './snippets';
import consoleOutput from './console';
// import currentCode from './currentCode';

const rootReducer = combineReducers({
    snippets,
    consoleOutput,
    // currentCode
});

export default rootReducer;
