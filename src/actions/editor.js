export const NEXT_SNIPPET = 'NEXT_SNIPPET';
export const PREVIOUS_SNIPPET = 'PREVIOUS_SNIPPET';
export const RESET_STATE = 'RESET_STATE';
export const SELECT_SNIPPET = 'SELECT_SNIPPET';
export const SELECT_SOLUTION = 'SELECT_SOLUTION';
export const UPDATE_CODE = 'UPDATE_CODE';

export const selectSnippet = (id) => {
  return {
    type: SELECT_SNIPPET,
    id
  }
}

export const nextSnippet = (id) => {
  return {
    type: NEXT_SNIPPET
  }
}

export const previousSnippet = (id) => {
  return {
    type: PREVIOUS_SNIPPET
  }
}

export const updateCode = (code) => {
  return {
    type: UPDATE_CODE,
    code
  }
}

export const selectSolution = (id) => {
  return {
    type: SELECT_SOLUTION,
    id: id.slice(10)
  }
}

export const resetEditorState = () => {
  return {
    type: RESET_STATE
  }
}
