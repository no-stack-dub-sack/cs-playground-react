import { CODE } from '../assets/codeRef';

import {
  OPEN_RESOURCES_MODAL,
  CLOSE_MODAL,
  OPEN_ANNOUNCEMENT_MODAL
} from '../actions/modal';

const defaultState = {
  renderModal: false,
  modalId: '',
  messages: [],
  subHeader: '',
  modalType: ''
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        ...state,
        renderModal: false
      }
    case OPEN_RESOURCES_MODAL:
      // only toggle rederModal if
      // modal state already loaded
      if (state.modalId === action.id) {
        return {
          ...state,
          renderModal: true
        }
      }
      // otherwise find the right
      // modal and load it's state
      for (let category in CODE) {
        for (let topic of CODE[category]) {
          if (topic.title === action.id) {
            return {
              modalId: action.id,
              modalType: 'resources',
              renderModal: true,
              messages: topic.resources
            }
          }
        }
      }
      break;
    case OPEN_ANNOUNCEMENT_MODAL:
      return {
        modalId: action.id,
        modalType: 'announcement',
        renderModal: true,
        subHeader: action.subHeader,
        messages: action.messages
      }
    default:
      return state;
  }
};
