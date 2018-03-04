import type { Action } from '../types/Actions'

export default (state: Array<string> = [], action: Action) => {
  switch(action.type) {
    case 'CONSOLE_LOG':
      return [
        ...state,
        action.logs
      ]
    case 'CLEAR_CONSOLE':
      return []
    default:
      return state
  }
}
