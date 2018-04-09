// @flow
import type { CodeStore, EditorState } from '../../../types/Reducers'

import { map } from 'lodash'

export default (state: EditorState, newCode: string): CodeStore => {
  if (!state.current.isSolution && state.current.id !== 'welcome') {
    return map(state.codeStore, challenge => {
      if (state.current.id === challenge.id) {
        return {
          ...challenge,
          userCode: newCode
        }
      } else {
        return challenge
      }
    })
  } else {
    return state.codeStore
  }
}
