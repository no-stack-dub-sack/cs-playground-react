// @flow
import type { Action } from '../types/Actions'
import { MENU_STATE } from '../utils/localStorageKeys'

type MenuState = Array<{ name: string, open: boolean }>
// reducer's default state is either the initial state or
// is pulled from local storage, which is set in index.js
const initialState: MenuState = [
  { name: 'SORTING_ALGOS', open: true },
  { name: 'DATA_STRUCTURES', open: false },
  { name: 'ALGORITHM_CHALLENGES', open: true },
  { name: 'EASY_ALGOS', open: false },
  { name: 'MODERATE_ALGOS', open: false },
  { name: 'REPLS', open: true }
]

const hydrate: ?string = localStorage.getItem(MENU_STATE)
const defaultState: MenuState = hydrate
  ? JSON.parse(hydrate)
  : initialState

export default (state: MenuState = defaultState, action: Action): MenuState => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      const open = action.data.open
      const name = action.data.name
      return state.map(menuItem =>{
        if (menuItem.name === name) {
          return { name: menuItem.name, open }
        }
        return menuItem
      })
    default:
      return state
  }
}
