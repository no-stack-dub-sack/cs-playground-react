import { UPDATE_CONSOLE } from '../actions/hijackConsole';
import { CLEAR_CONSOLE } from '../actions/editor';

const consoleOutput = (state = [], action) => {
  switch(action.type) {
    case UPDATE_CONSOLE:
      return [
        ...state,
        action.message
      ];
    case CLEAR_CONSOLE:
      return [];
    default:
      return state;
  }
}

export default consoleOutput;
