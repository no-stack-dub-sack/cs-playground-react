import * as types from '../actions/types';

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
        transition: '.5s',
        clickState: 1
      }
    case 1:
      return {
        ...state,
        topHeight: '99%',
        bottomHeight: '0%',
        transition: '.5s',
        clickState: 2
      }
    default:
      return {
        ...state,
        topHeight: '70%',
        bottomHeight: '30%',
        transition: '.5s',
        clickState: 0
      }
  }
}

const panes = (state = defaultState, action) => {
  switch (action.type) {
    case types.RESET_STATE:
      localStorage.removeItem('cs-pg-react-panesState');
      return initialState;
    case types.DRAG_HORIZONTAL:
      // HACK: note that this is a bandaid solution to poor responsiveness
      // for the menu. A better solution less coupled with state is needed
      // SEE: Menu & Console components for parts 2 & 3 of bandaid
      if (parseInt(action.leftWidth, 10) < 39) {
        return {
          ...state,
          leftWidth: action.leftWidth,
          rightWidth: action.rightWidth,
          transition: '.5s'
        }
      }
      return {
        ...state,
        leftWidth: action.leftWidth,
        rightWidth: action.rightWidth,
        transition: 'none'
      }
    case types.DRAG_VERTICAL:
      return {
        ...state,
        topHeight: action.topHeight,
        bottomHeight: action.bottomHeight,
        transition: 'none'
      }
    case types.DOUBLE_CLICK:
      return hidePanes(state);
    default:
      return state;
  }
}

export default panes;
