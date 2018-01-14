export const NEXT_SNIPPET = 'NEXT_SNIPPET';
export const PREVIOUS_SNIPPET = 'PREVIOUS_SNIPPET';
export const RESET_STATE = 'RESET_STATE';
export const SELECT_SNIPPET = 'SELECT_SNIPPET';
export const SELECT_SOLUTION = 'SELECT_SOLUTION';
export const UPDATE_CODE = 'UPDATE_CODE';

export const nextSnippet = () => ({
  type: NEXT_SNIPPET
});

export const previousSnippet = () => ({
  type: PREVIOUS_SNIPPET
});

export const selectSnippet = (id) => ({
  type: SELECT_SNIPPET,
  id
});

export const resetEditorState = () => ({
  type: RESET_STATE
});

export const updateCode = (code) => ({
  type: UPDATE_CODE,
  code
});

export const selectSolution = (id) => ({
  type: SELECT_SOLUTION,
  id: id.slice(10)
});
