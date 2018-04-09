// @flow
import { filter, head } from 'lodash'

import type { MenuState } from '../types/Reducers';
import type { ToggleMenu } from '../types/Actions';

export const toggleMenu = (
  data: { name: string, open: boolean }
): ToggleMenu => ({
  type: 'TOGGLE_MENU',
  data
})

export const isMenuOpen = (menuState: MenuState, name: string): boolean =>
  head(filter(menuState, menuItem =>
    menuItem.name === name
  )).open
