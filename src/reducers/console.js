import * as types from '../actions/types'

export default (state = [], action) => {
  switch(action.type) {
    case types.CONSOLE_LOG:
      return [
        ...state,
        action.messages
      ]
    case types.CLEAR_CONSOLE:
      return []
    default:
      return state
  }
}
