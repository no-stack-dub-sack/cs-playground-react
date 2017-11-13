import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal';

const defaultState = {
  renderModal: false,
  modalId: ''
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        ...state,
        renderModal: false
      };
    case OPEN_MODAL:
      return {
        renderModal: true,
        modalId: action.id
      };
    default:
      return state;
  }
};
