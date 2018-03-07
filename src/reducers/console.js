import type { Action } from '../types/Actions'

export default (state: string[] = [], action: Action): string[] => {
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
