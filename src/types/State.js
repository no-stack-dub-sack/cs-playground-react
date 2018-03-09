// @flow
import type {
  EditorState,
  MenuState,
  ModalState,
  PanesState,
  ThemeState
} from './Reducers'

import type { Action } from './Actions'

export type State = {|
  console: (state?: string[], action: Action) => string[],
  editor: (state?: EditorState, action: Action) => EditorState,
  menu: (state?: MenuState, action: Action) => MenuState,
  modal: (state?: ModalState, action: Action) => ModalState,
  panes: (state?: PanesState, action: Action) => PanesState,
  theme: (state?: ThemeState, action: Action) => ThemeState
|}
