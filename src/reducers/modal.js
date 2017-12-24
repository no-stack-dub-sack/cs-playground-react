import { OPEN_RESOURCES_MODAL, CLOSE_MODAL } from '../actions/modal';
import { CODE } from '../assets/codeRef';

const defaultState = {
  renderModal: false,
  modalId: '',
  resources: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        ...state,
        resources: [],
        renderModal: false
      };
    case OPEN_RESOURCES_MODAL:
      for (let category in CODE) {
        for (let topic of CODE[category]) {
          if (topic.title === action.id) {
            return {
              modalId: action.id,
              renderModal: true,
              resources: [
                ...topic.resources
              ]
            };
          }
        }
      }
      break;
    default:
      return state;
  }
};
