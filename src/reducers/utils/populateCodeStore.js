import { forEach, replace } from 'lodash'

// codeStore initialization utility
export default function populateCodeStore(CODE) {
  const arr = []
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
