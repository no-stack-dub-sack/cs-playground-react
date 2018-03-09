// @flow
import type { Action } from '../../../types/Actions'
import type { EditorState } from '../../../types/Reducers'
import { SOLUTIONS } from '../../../assets/codeRef'
import editor from '../editor'

export default (state: EditorState, action: Action): EditorState => {
  switch (action.type) {
    case 'SELECT_SOLUTION':
      return {
        ...state,
        current: {
          id: action.id,
          code: SOLUTIONS.get(action.id) || '',
          isSolution: true
        }
      }
    case 'TOGGLE_SOLUTION':
      if (!SOLUTIONS.has(state.current.id))
        return state
      return !state.current.isSolution
        ? editor(state, { type: 'SELECT_SOLUTION', id: state.current.id })
        : editor(state, { type: 'SELECT_CHALLENGE', id: state.current.id })
    default: return state
  }
}
