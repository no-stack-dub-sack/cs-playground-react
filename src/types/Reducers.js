// @flow
import type { Action } from './Actions'
import type { Code } from '../assets/codeRef'

// Editor:
export type CodeStore = Array<{
  id: string,
  userCode: string
}>
export type CurrentEditorState = {
  +id: string,
  +code: string,
  +isSolution: boolean
}
export type EditorState = {
  +isSharedRepl: boolean,
  +current: {
    +id: string,
    +code: string,
    +isSolution: boolean
  },
  +codeStore: CodeStore,
  +orderKey: string[]
}
export type EditorReducer = (EditorState, Action) => EditorState

// Editor Utils:
export type MergeCodeStores = (CodeStore, CodeStore) => CodeStore
export type RemoveDupes = (c: CodeStore) => CodeStore
export type AddSuppressTests = (
  cs: CodeStore,
  ces: CurrentEditorState,
  orderKey: string[]
) => {
  codeStore: CodeStore,
  current: CurrentEditorState
}
export type ComposeCodeStore = (
  i: EditorState,
  d: EditorState
) => {
  codeStore: CodeStore,
  current: CurrentEditorState
}
export type CheckForUpdates = (
  i: EditorState,
  d: EditorState,
  c: Code
) => EditorState

export type RunInitializationUtils = (
  i: EditorState,
  s: ?string,
  c: Code
) => EditorState

// Modal
export type ModalState = {
  +messages: string[] | string,
  +modalId: string,
  +modalType: string,
  +renderModal: boolean,
  +subHeader?: string,
}

// Menu
export type MenuState = Array<{ +name: string, +open: boolean }>


// Panes
export type PanesState = {
  +topHeight: string,
  +bottomHeight: string,
  +leftWidth: string,
  +rightWidth: string,
  +transition: string,
  +clickState: number
}

// Themes
export type ThemeState = {
  +current: string,
  +themes: string[]
}
