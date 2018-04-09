// @flow
import type { NextTheme, PrevTheme } from '../types/Actions';

export const nextTheme = (): NextTheme => ({ type: 'NEXT_THEME' })
export const prevTheme = (): PrevTheme => ({ type: 'PREV_THEME' })
