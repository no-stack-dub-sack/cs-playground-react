// @flow
import type { Action } from '../types/Actions'
import { CODE } from '../assets/codeRef'
import type { ModalState } from '../types/Reducers'

const defaultState: ModalState = {
  renderModal: false,
  modalId: '',
  messages: [],
  subHeader: '',
  modalType: ''
}

export default (state: ModalState = defaultState, action: Action): ModalState => {
  switch (action.type) {
    case 'CLOSE_MODAL':
      return {
        ...state,
        renderModal: false
      }
    case 'OPEN_THEME_MODAL':
      return {
        renderModal: true,
        modalId: action.id,
        messages: [],
        subHeader: '',
        modalType: 'theme'
      }
    case 'OPEN_RESOURCES_MODAL':
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
      let newState = state
      for (let category in CODE) {
        for (let topic of CODE[category]) {
          if (topic.title === action.id) {
            newState = {
              modalId: action.id,
              modalType: 'resources',
              renderModal: true,
              messages: topic.resources
            }
          }
        }
      }
      return newState
    case 'OPEN_ANNOUNCEMENT_MODAL':
      return {
        modalId: action.id,
        modalType: 'announcement',
        renderModal: true,
        subHeader: action.subHeader,
        messages: action.messages
      }
    case 'OPEN_CONFIRM_MODAL':
      return {
        modalId: action.id,
        modalType: 'confirm',
        renderModal: true,
        subHeader: '',
        messages: []
      }
    default: return state
  }
}
