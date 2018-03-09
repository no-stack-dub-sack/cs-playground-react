// @flow
export type AddRepl = { type: 'ADD_REPL', id: string }
export type ClearConsole = { type: 'CLEAR_CONSOLE' }
export type CloseModal = { type: 'CLOSE_MODAL' }
export type ConsoleLog  = { type: 'CONSOLE_LOG', logs: string }
export type DeleteRepl = { type: 'DELETE_REPL', id: string }
export type DoubleClick = { type: 'DOUBLE_CLICK' }
export type DragHorizontal = {
    type: 'DRAG_HORIZONTAL',
    leftWidth: string,
    rightWidth: string
  }
export type DragVertical = {
    type: 'DRAG_VERTICAL',
    bottomHeight: string,
    topHeight: string
  }
export type LoadRepl = { type: 'LOAD_SHARED_REPL', code: string }
export type NextChallenge = { type: 'NEXT_CHALLENGE' }
export type NextTheme = { type: 'NEXT_THEME' }
export type OnDrag = (
  el: Object,
  pageX: number,
  startX: number,
  pageY: number,
  startY: number,
  resize: Object
) => void
export type OpenAnnouncementModal = {
    type: 'OPEN_ANNOUNCEMENT_MODAL',
    id: string,
    subHeader: string,
    messages: string[]
  }
export type OpenConfirmModal = { type: 'OPEN_CONFIRM_MODAL', id: string }
export type OpenResourcesModal = { type: 'OPEN_RESOURCES_MODAL', id: string }
export type OpenThemeModal = { type: 'OPEN_THEME_MODAL', id: string }
export type PrevChallenge  = { type: 'PREV_CHALLENGE' }
export type PrevTheme = { type: 'PREV_THEME' }
export type ResetState = { type: 'RESET_STATE' }
export type SelectChallenge = { type: 'SELECT_CHALLENGE', id: string }
export type SelectSolution = { type: 'SELECT_SOLUTION', id: string }
export type ToggleMenu = {
    type: 'TOGGLE_MENU',
    data: {
      name: string,
      open: boolean
    }
  }
export type ToggleSolution = { type: 'TOGGLE_SOLUTION', id: string }
export type UpdateCode = {
    type: 'UPDATE_CODE',
    code: string
  }

export type Action =
  | AddRepl
  | ClearConsole
  | CloseModal
  | ConsoleLog
  | DeleteRepl
  | DoubleClick
  | DragHorizontal
  | DragVertical
  | LoadRepl
  | NextChallenge
  | NextTheme
  | OpenAnnouncementModal
  | OpenConfirmModal
  | OpenResourcesModal
  | OpenThemeModal
  | PrevChallenge
  | PrevTheme
  | ResetState
  | SelectChallenge
  | SelectSolution
  | ToggleMenu
  | ToggleSolution
  | UpdateCode
