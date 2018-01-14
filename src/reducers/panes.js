import { RESET_STATE } from '../actions/editor';

import {
  DRAG_HORIZONTAL,
  DRAG_VERTICAL,
  DOUBLE_CLICK
} from '../actions/panes';

const initialState = {
  topHeight: '70%',
  bottomHeight: '30%',
  leftWidth: '30%',
  rightWidth: '69.5%',
  transition: 'none',
  clickState: 0
}

let defaultState = JSON.parse(
  localStorage.getItem('cs-pg-react-panesState')
) || initialState;

const hidePanes = (state) => {
  switch (state.clickState) {
    case 0:
      return {
        ...state,
        topHeight: '0%',
        bottomHeight: '99%',
        transition: '.3s',
        clickState: 1
      }
    case 1:
      return {
        ...state,
        topHeight: '99%',
        bottomHeight: '0%',
        transition: '.3s',
        clickState: 2
      }
    default:
      return {
        ...state,
        topHeight: '70%',
        bottomHeight: '30%',
        transition: '.3s',
        clickState: 0
      }
  }
}

const panes = (state = defaultState, action) => {
  switch (action.type) {
    case RESET_STATE:
      localStorage.removeItem('cs-pg-react-panesState');
      return initialState;
    case DRAG_HORIZONTAL:
      return {
        ...state,
        leftWidth: action.leftWidth,
        rightWidth: action.rightWidth
      }
    case DRAG_VERTICAL:
      return {
        ...state,
        topHeight: action.topHeight,
        bottomHeight: action.bottomHeight,
        transition: 'none'
      }
    case DOUBLE_CLICK:
      return hidePanes(state);
    default:
      return state;
  }
}

export default panes;
