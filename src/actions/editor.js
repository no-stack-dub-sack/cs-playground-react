// @flow

import type {
  AddRepl,
  DeleteRepl,
  LoadRepl,
  NextChallenge,
  PrevChallenge,
  ResetState,
  SelectChallenge,
  SelectSolution,
  ToggleSolution,
  UpdateCode
} from '../types/Actions';

export const loadRepl = (code: string): LoadRepl => ({
  type: 'LOAD_SHARED_REPL',
  code
})

export const addRepl = (id: string): AddRepl => ({
  type: 'ADD_REPL',
  id
})

export const nextChallenge = (): NextChallenge => ({
  type: 'NEXT_CHALLENGE'
})

export const prevChallenge = (): PrevChallenge => ({
  type: 'PREV_CHALLENGE'
})

export const selectChallenge = (id: string): SelectChallenge => ({
  type: 'SELECT_CHALLENGE',
  id
})

export const selectSolution = (id: string): SelectSolution => ({
  type: 'SELECT_SOLUTION',
  id
})

export const toggleSolution = (id: string): ToggleSolution => ({
  type: 'TOGGLE_SOLUTION',
  id
})

export const resetEditorState = (): ResetState => ({
  type: 'RESET_STATE'
})

export const updateCode = (code: string): UpdateCode => ({
  type: 'UPDATE_CODE',
  code
})

export const deleteRepl = (id: string): DeleteRepl => ({
  type: 'DELETE_REPL',
  id
})
