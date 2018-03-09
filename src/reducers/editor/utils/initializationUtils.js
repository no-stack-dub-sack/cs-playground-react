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
  RemoveDupes,
  RunInitializationUtils
} from '../../../types/Reducers'
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
const mergeCodeStores: MergeCodeStores = (initialCS, savedCS) => {
  return uniqWith([
    ...savedCS,
    ...filter(
      initialCS,
      challenge => findIndex(
        savedCS,
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

export const addSuppressTestsOnlyOnce: AddSuppressTests = (codeStore, current, orderKey) => {
  const isDisabled = {}
  const newCodeStore = []
  if (!localStorage.getItem(ALL_TESTS_SUPPRESSED)) {
    for (let i = 0; i < codeStore.length; i++) {
      // dont add comment to repls
      if (i < orderKey.length) {
        newCodeStore.push({
          ...codeStore[i],
          userCode: codeStore[i].userCode.concat(
            '\r\r// SUPPRESS TESTS, delete this line to activate\r'
          )
        })
        // indicate specific challenge disbaled so toggle suppress
        // tests works. see src/utils/toggleSuppressTests.js
        isDisabled[codeStore[i].id] = true
      }
    }
    // add suppression to current challenge so user notices change
    if (!current.isSolution && indexOf(orderKey, current.id) > -1) {
      current = {
        ...current,
        code: current.code.concat(
          '\r\r// SUPPRESS TESTS, delete this line to activate\r'
        )
      }
    }
    localStorage.setItem(IS_SUITE_SUPPRESSED, JSON.stringify(isDisabled))
    localStorage.setItem(ALL_TESTS_SUPPRESSED, 'true')
  }
  return { codeStore: newCodeStore, current }
}

// compose utils, return dupe free code store
const composeCodeStore: ComposeCodeStore = (initialState, savedState) =>  {
  return addSuppressTestsOnlyOnce(
    removeDuplicates(
      mergeCodeStores(
        initialState.codeStore,
        savedState.codeStore
      )
    ),
    savedState.current,
    initialState.orderKey.slice(0, -1)
  )
}

// if not 1st visit, compare saved/initial states and if new challenges have
// been added, call composeCodeStore to merge in new challenges and/or remove dupes from bug
const checkForUpdates: CheckForUpdates = (initialState, savedState, CODE) => {
  const replsBeginIdx = findIndex(savedState.codeStore, { id: 'Free_Code' })

  if (
    initialState.codeStore.length !==
    savedState.codeStore.slice(0, replsBeginIdx+1).length
  ) {

    const updated = composeCodeStore(
      initialState,
      savedState
    )

    return {
      ...savedState,
      current: updated.current,
      codeStore: updated.codeStore,
      // preserve repls
      orderKey: uniq(
        concat(
          createOrderKey(CODE),
          savedState.orderKey
        )
      )
    }
  }

  return savedState
}

// expose runInitializationUtils, if savedState exists, check for updates and run remaining
// utils, including removing duplicates from earlier introduced (and now resolved) codeStore bug
// otherwise, 1st visit, add test suppression comments & intialize toggleSuppressTests local storage
export const runInitializationUtils: RunInitializationUtils = (initialState, savedState, CODE) => {
  if (!savedState) {
    const updated = addSuppressTestsOnlyOnce(
      initialState.codeStore,
      initialState.current,
      createOrderKey(CODE)
    )

    return {
      ...initialState,
      codeStore: updated.codeStore,
      current: updated.current
    }

  } else {
    return checkForUpdates(
      initialState,
      JSON.parse(savedState),
      CODE
    )
  }
}
