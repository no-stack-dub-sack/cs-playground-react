import { RESET_STATE } from '../actions/editor';
import { DRAG_HORIZONTAL, DRAG_VERTICAL } from '../actions/drag';

const initialState = {
  topHeight: '70%',
  bottomHeight: '30%',
  leftWidth: '30%',
  rightWidth: '69.5%'
};

let defaultState = JSON.parse(
  localStorage.getItem('cs-pg-react-panesState')
) || initialState;

const panes = (state = defaultState, action) => {
  switch (action.type) {
    case RESET_STATE:
      localStorage.removeItem('cs-pg-react-panesState');
      return initialState;
    case DRAG_HORIZONTAL:
      return {
        ...state,
        leftWidth: action.leftWidth,
        rightWidth: action.rightWidth,
      }
    case DRAG_VERTICAL:
      return {
        ...state,
        topHeight: action.topHeight,
        bottomHeight: action.bottomHeight,
      }
    default:
      return state;
  }
}

export default panes;
