// @flow
export type Action =
  | { type: 'ADD_REPL', id: string }
  | { type: 'CLEAR_CONSOLE' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'CONSOLE_LOG', logs: string }
  | { type: 'DELETE_REPL', id: string }
  | { type: 'DOUBLE_CLICK' }
  | {
      type: 'DRAG_HORIZONTAL',
      leftWidth: string,
      rightWidth: string
    }
  | {
      type: 'DRAG_VERTICAL',
      bottomHeight: string,
      topHeight: string
    }
  | { type: 'LOAD_SHARED_REPL', code: string }
  | { type: 'NEXT_CHALLENGE' }
  | { type: 'NEXT_THEME' }
  | {
      type: 'OPEN_ANNOUNCEMENT_MODAL',
      id: string,
      subHeader: string,
      messages: Array<string>
    }
  | { type: 'OPEN_CONFIRM_MODAL', id: string }
  | { type: 'OPEN_RESOURCES_MODAL', id: string }
  | { type: 'OPEN_THEME_MODAL', id: string }
  | { type: 'PREV_CHALLENGE' }
  | { type: 'PREV_THEME' }
  | { type: 'RESET_STATE' }
  | { type: 'SELECT_CHALLENGE', id: string }
  | { type: 'SELECT_SOLUTION', id: string }
  | {
      type: 'TOGGLE_MENU',
      data: {
        name: string,
        open: boolean
      }
    }
  | { type: 'TOGGLE_SOLUTION', id: string }
  | {
      type: 'UPDATE_CODE',
      code: string,
      id: string
    }
