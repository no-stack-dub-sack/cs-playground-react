// @flow
import {
  ALL_TESTS_SUPPRESSED,
  IS_SUITE_SUPPRESSED,
  RMOVE_DUPES,
} from '../../../utils/localStorageKeys'
import type {
  AddSuppressTests,
  CheckForUpdates,
  ComposeCodeStore,
  MergeCodeStores,
  RemoveDupes
} from '../../../types/Editor'
import {
  concat,
  filter,
  findIndex,
  indexOf,
  isEqual,
  uniq,
  uniqWith
} from 'lodash'

import createOrderKey from './createOrderKey'

// isolate new challenges, combine, remove exact dupes
const mergeCodeStores: MergeCodeStores = (initialState, codeStore) => {
  return uniqWith([
    ...codeStore,
    ...filter(
      initialState,
      challenge => findIndex(
        codeStore,
        { id: challenge.id }
      ) === -1
    )
  ], isEqual)
}

const removeDuplicates: RemoveDupes = (codeStore) => {
  if (!localStorage.getItem(RMOVE_DUPES)) {
    for (let i = 0; i < codeStore.length; i++) {
      if (codeStore[i]) {
        const predicate = { id: codeStore[i].id }
        while (findIndex(codeStore, predicate, i+1) > i) {
          const idx = findIndex(codeStore, predicate, i+1)
          // $FlowFixMe
          codeStore[idx] = null
        }
      }
    }
    localStorage.setItem(RMOVE_DUPES, 'true')
  }
  return filter(
    codeStore,
    challenge => challenge !== null
  )
}

const addSuppressTestsOnlyOnce: AddSuppressTests = (codeStore, current, orderKey) => {
  const isDisabled = {}
  if (!localStorage.getItem(ALL_TESTS_SUPPRESSED)) {
    for (let i = 0; i < codeStore.length; i++) {
      // dont add comment to repls
      if (i < orderKey.length) {
        codeStore[i].userCode = codeStore[i].userCode.concat(
          '\r\r// SUPPRESS TESTS, delete this line to activate\r'
        )
        // indicate specific challenge disbaled so toggle suppress
        // tests works. see src/utils/toggleSuppressTests.js
        isDisabled[codeStore[i].id] = true
      }
    }
    // add suppression to current challenge so user notices change
    if (!current.isSolution && indexOf(orderKey, current.id) > -1) {
      current.code = current.code.concat(
        '\r\r// SUPPRESS TESTS, delete this line to activate\r'
      )
    }
    localStorage.setItem(IS_SUITE_SUPPRESSED, JSON.stringify(isDisabled))
    // indicate all tests have been suppressed by default
    localStorage.setItem(ALL_TESTS_SUPPRESSED, 'true')
  }
  return { codeStore, current }
}

// compose utils, return dupe free code store
const composeCodeStore: ComposeCodeStore = (initialState, defaultState) =>  {
  return addSuppressTestsOnlyOnce(
    removeDuplicates(
      mergeCodeStores(
        initialState.codeStore,
        defaultState.codeStore
      )
    ),
    defaultState.current,
    initialState.orderKey.slice(0, -1)
  )
}

// expose as checkForUpdates to compare default/initial states
// if new challenges have been added, call composeCodeStore
// to merge in new challenges and/or remove dupes from bug
const checkForUpdates: CheckForUpdates = (initialState, defaultState, CODE) => {
  const newCodeStore = defaultState.codeStore
  const oldCodeStore = initialState.codeStore
  const replsBeginIdx = findIndex(defaultState.codeStore, { id: 'Free_Code' })
  if (oldCodeStore.length !== newCodeStore.slice(0, replsBeginIdx+1).length ) {
    const { codeStore, current } = composeCodeStore(initialState, defaultState)
    return {
      ...defaultState,
      current,
      codeStore,
      // preserve repls
      orderKey: uniq(
        concat(createOrderKey(CODE),
        defaultState.orderKey)
      )
    }
  }
  return defaultState
}

export default checkForUpdates
