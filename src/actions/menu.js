import * as types from './types'
import { filter, head } from 'lodash'

export const toggleMenu = (data) => ({
  type: types.TOGGLE_MENU,
  data
})

export const isMenuOpen = (menuState, name) =>
  head(filter(menuState, menuItem =>
    menuItem.name === name
  )).open
