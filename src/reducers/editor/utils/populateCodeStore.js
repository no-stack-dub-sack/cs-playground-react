// @flow
import { forEach, replace } from 'lodash'

import type { Code } from '../../assets/codeRef'
import type { CodeStore } from '../../types/Editor'

// codeStore initialization utility
export default function populateCodeStore(CODE: Code): CodeStore {
  const arr: CodeStore = []
  for (let category in CODE) {
    forEach(
      CODE[category],
      challenge =>
      arr.push({
        id: replace(challenge.title, /\s/g, ''),
        userCode: challenge.seed
      })
    )
  }
  return arr
}
