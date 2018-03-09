// @flow
import { flatten, replace } from 'lodash'

import type { Code } from '../../../assets/codeRef'

// => arr of chal IDs in correct order
export default function createOrderKey(CODE: Code): string[] {
  const {
    SORTING_ALGOS,
    DATA_STRUCTURES,
    EASY_ALGOS,
    MODERATE_ALGOS,
    REPLS
  } = CODE
  return flatten([
    SORTING_ALGOS,
    DATA_STRUCTURES,
    EASY_ALGOS,
    MODERATE_ALGOS,
    REPLS
  ])
  .map(challenge =>
    replace(
      challenge.title, /\s/g, ''
  ))
}
