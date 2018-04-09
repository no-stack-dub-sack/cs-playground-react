// @flow
import { forEach, replace } from 'lodash'

import type { Challenge } from '../../../assets/codeRef'
import type { Code } from '../../../assets/codeRef'
import type { CodeStore } from '../../../types/Reducers'

// codeStore initialization utility
export default function populateCodeStore(CODE: Code): CodeStore {
  const arr: CodeStore = []
  for (let category in CODE) {
    forEach(
      CODE[category],
      (challenge: Challenge): void => {
        arr.push({
          id: replace(challenge.title, /\s/g, ''),
          userCode: challenge.seed
        })
      }
    )
  }
  return arr
}
