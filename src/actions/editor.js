import * as types from './types'

export const nextChallenge = () => ({
  type: types.NEXT_CHALLENGE
})

export const prevChallenge = () => ({
  type: types.PREV_CHALLENGE
})

export const selectChallenge = (id) => ({
  type: types.SELECT_CHALLENGE,
  id
})

export const selectSolution = (id) => ({
  type: types.SELECT_SOLUTION,
  id
})

export const toggleSolution = (id) => ({
  type: types.TOGGLE_SOLUTION,
  id
})

export const resetEditorState = () => ({
  type: types.RESET_STATE
})

export const updateCode = (code) => ({
  type: types.UPDATE_CODE,
  code
})
