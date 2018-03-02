import * as types from '../actions/types'
import { MENU_STATE } from '../utils/localStorageKeys'

// reducer's default state is either the initial state or
// is pulled from local storage, which is set in index.js

const initialState = () => {
  let initialStateArr = []
  initialStateArr.push({ name: 'SORTING_ALGOS', open: true })
  initialStateArr.push({ name: 'DATA_STRUCTURES', open: false })
  initialStateArr.push({ name: 'ALGORITHM_CHALLENGES', open: true })
  initialStateArr.push({ name: 'EASY_ALGOS', open: false })
  initialStateArr.push({ name: 'MODERATE_ALGOS', open: false })
  initialStateArr.push({ name: 'REPLS', open: true })
  return initialStateArr
}

let defaultState = JSON.parse(
  localStorage.getItem(MENU_STATE)
) || initialState()

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.TOGGLE_MENU:
      const open = action.data.open
      return state.map(menuItem =>{
        if (menuItem.name === action.data.name) {
          return { name: menuItem.name, open }
        }
        return menuItem
      })
    default:
      return state
  }
}
