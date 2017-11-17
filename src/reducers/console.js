import { CLEAR_CONSOLE, CONSOLE_LOG } from '../actions/console';

export default (state = [], action) => {
  switch(action.type) {
    case CONSOLE_LOG:
      return [
        ...state,
        action.messages
      ];
    case CLEAR_CONSOLE:
      return [];
    default:
      return state;
  }
}
