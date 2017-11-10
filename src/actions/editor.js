export const SELECT_SNIPPET = 'SELECT_SNIPPET';
export const UPDATE_CODE = 'UPDATE_CODE';
export const CLEAR_CONSOLE = 'CLEAR_CONSOLE';
export const NEXT_SNIPPET = 'NEXT_SNIPPET';
export const PREVIOUS_SNIPPET = 'PREVIOUS_SNIPPET';
export const SELECT_SOLUTION = 'SELECT_SOLUTION';

export const selectSnippet = (id) => {
  return {
    type: SELECT_SNIPPET,
    id
  }
};

export const selectSolution = (id) => {
  return {
    type: SELECT_SOLUTION,
    id
  }
};

export const nextSnippet = (id) => {
  return {
    type: NEXT_SNIPPET
  }
};

export const previousSnippet = (id) => {
  return {
    type: PREVIOUS_SNIPPET
  }
};

export const updateCode = (code, mod) => {
  return {
    type: UPDATE_CODE,
    code,
    mod
  }
};

export const clearConsole = () => {
  return {
    type: CLEAR_CONSOLE
  }
};
