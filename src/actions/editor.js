import * as types from './types';

export const nextSnippet = () => ({
  type: types.NEXT_SNIPPET
});

export const previousSnippet = () => ({
  type: types.PREVIOUS_SNIPPET
});

export const selectSnippet = (id) => ({
  type: types.SELECT_SNIPPET,
  id
});

export const selectSolution = (id) => ({
  type: types.SELECT_SOLUTION,
  id
});

export const toggleSolution = (id) => ({
  type: types.TOGGLE_SOLUTION,
  id
});

export const resetEditorState = () => ({
  type: types.RESET_STATE
});

export const updateCode = (code) => ({
  type: types.UPDATE_CODE,
  code
});
