import { uniqWith, isEqual, findIndex } from 'lodash';

// isolate new challenges, combine, remove exact dupes
function mergeCodeStores({ codeStore: initialState }, { codeStore }) {
  return uniqWith([
    ...codeStore,
    ...initialState,
    isEqual
  ]);
}

// identify entries with duplicate ids
function identifyDuplicates(codeStore) {
  const indexPairs = [];
  for (let i = 0; i < codeStore.length; i++) {
    const predicate = { id: codeStore[i].id };
    const secondIdx = findIndex(codeStore, predicate, i+1);
    if (secondIdx > i)
      indexPairs.push([i, secondIdx]);
  }
  return { indexPairs, codeStore }
}

// remove superfluous entries, if code str is same as OG
function removeDuplicates({ indexPairs, codeStore }, initialState) {
  if (!indexPairs.length) return codeStore;
  for (let [ idxOne, idxTwo ] of indexPairs) {
    console.log(idxOne, idxTwo);
    const OG = initialState[
      findIndex(
        initialState,
        { id: codeStore[idxOne].id }
      )
    ].userCode
    if (codeStore[idxTwo].userCode === OG)
      codeStore[idxTwo] = null;
    else if (codeStore[idxOne].userCode === OG)
      codeStore[idxOne] = null;
  }

  return codeStore.filter(challenge => challenge !== null);
}

// compose utils, return dupe free code store
export default function(initialState, defaultState) {
  return removeDuplicates(
    identifyDuplicates(
      mergeCodeStores(initialState, defaultState)
    ),
    initialState.codeStore
  );
}
