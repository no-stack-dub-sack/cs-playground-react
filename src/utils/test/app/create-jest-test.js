import { concatTests, logResults } from './jest-test-utils'
import { SOLUTIONS } from '../../../assets/codeRef'
import TESTS from '../../../assets/testRef'

export default (ID) => {
  test(ID, () => {
    // eslint-disable-next-line
    const { passed, results } = eval(
      concatTests(
        SOLUTIONS[ID],
        TESTS[ID].tail ? TESTS[ID].tail : '',
        JSON.stringify(TESTS[ID].tests)
      )
    )
    logResults(passed, results, ID)
    expect(passed).toBe(true)
  })
}
