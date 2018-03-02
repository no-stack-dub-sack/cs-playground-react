import * as types from '../actions/types'
import { CODE } from '../assets/codeRef'
import { MENU_STATE } from '../utils/localStorageKeys'


// reducer's default state is either the initial state or
// is pulled from local storage, which is set in index.js


var initialState = () => {
  let initialStateArr = [];
  for (var menuItem in CODE) {
    if (CODE.hasOwnProperty(menuItem)) {
        initialStateArr.push({'name' : menuItem, 'open': true});
    }
  }
  return initialStateArr;
}

let defaultState = JSON.parse(
  localStorage.getItem(MENU_STATE)
) || initialState();

var menu = (state = defaultState, action) => {
  switch (action.type) {
    case types.TOGGLE_MENU:
      var newKey = action.data.name;
      var newVal = action.data.open;
      return state.map((menuItem)=>{
        if(menuItem.name === newKey){
            return {'name': newKey, 'open': newVal}
        }
        return menuItem;
      })
      break;

    default:
      return state;
  }
}

export default menu
