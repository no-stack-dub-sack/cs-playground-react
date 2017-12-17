import { CODE } from '../assets/codeRef';
import { SELECT_TOPIC } from '../actions/resources';

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_TOPIC:
      for (let category in CODE) {
        for (let topic of CODE[category]) {
          if (topic.title === action.id) {
            return [
              ...topic.resources
            ];
          }
        }
      }
      break;
    default:
      return state;
  }
};
