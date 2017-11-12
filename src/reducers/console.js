import { CLEAR_CONSOLE, UPDATE_CONSOLE } from '../actions/console';

export default (state = [], action) => {
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
