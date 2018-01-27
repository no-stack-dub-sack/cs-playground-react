import { uniqWith, isEqual, findIndex, flatten, replace } from 'lodash';

// STORE INITIALIZATION UTILS:
// codeStore initialization utility
export function populateCodeStore(CODE, arr = []) {
  for (let category in CODE) {
    CODE[category].forEach(item => {
      arr.push({
        id: replace(item.title, /\s/g, ''),
        userCode: item.seed
      })
    })
  }
  return arr
}

// => arr of chal IDs in correct order
export function createOrderKey(CODE) {
  const {
    SORTING_ALGOS,
    DATA_STRUCTURES,
    EASY_ALGOS,
    MODERATE_ALGOS
  } = CODE;
  return flatten([
    SORTING_ALGOS,
    DATA_STRUCTURES,
    EASY_ALGOS,
    MODERATE_ALGOS
  ])
  .map(c =>
    replace(c.title, /\s/g, '')
  );
}

// MERGE CODE STORE UTILS:
// isolate new challenges, combine, remove exact dupes
function mergeCodeStores({ codeStore: initialState }, { codeStore }) {
  return uniqWith([
    ...codeStore,
    ...initialState.filter(
      challenge => findIndex(
        codeStore,
        { id: challenge.id }
      ) === -1
    )
  ], isEqual);
}

function removeDuplicates(codeStore) {
  for (let i = 0; i < codeStore.length; i++) {
    if (codeStore[i]) {
      const predicate = { id: codeStore[i].id };
      while (findIndex(codeStore, predicate, i+1) > i) {
        const idx = findIndex(codeStore, predicate, i+1);
        codeStore[idx] = null;
      }
    }
  }

  return codeStore.filter(challenge => challenge !== null);
}

// compose utils, return dupe free code store
export function composeCodeStore(initialState, defaultState) {
  return removeDuplicates(
    mergeCodeStores(initialState, defaultState),
    initialState.codeStore
  );
}
