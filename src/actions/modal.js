import * as types from './types'

import {
  RENDR_MODAL,
  RESET_ANCMT
} from '../utils/localStorageKeys'

import { startCase } from 'lodash'
import { store } from '../index'

export const openThemeModal = (id) => ({
  type: types.OPEN_THEME_MODAL,
  id: startCase(id)
})

export const openResourcesModal = (id) => ({
  type: types.OPEN_RESOURCES_MODAL,
  id: startCase(id)
})

export const openConfirmModal = (id) => ({
  type: types.OPEN_CONFIRM_MODAL,
  id
})

export const openAnnouncementModal = () => ({
  type: types.OPEN_ANNOUNCEMENT_MODAL,
  id: 'Announcement (again)!',
  subHeader: announcements[0],
  messages: announcements.slice(1)
})

export const closeModal = () => ({ type: types.CLOSE_MODAL })

// render announemnet util
// render only first 3 visits
export function renderAnnouncementUtil() {
  let numAnnounced = localStorage.getItem(RENDR_MODAL)
  let isReset = localStorage.getItem(RESET_ANCMT)

  // reset for new announcements, and set
  // flag to prevent continuous resetting
  if (Number(numAnnounced) === 3 && !isReset) {
    localStorage.removeItem(RENDR_MODAL)
    localStorage.setItem(RESET_ANCMT, true)
    numAnnounced = undefined
  }

  // render modal, increment count, stopping at 3
  if (!numAnnounced) {
    localStorage.setItem(RENDR_MODAL, 1)
    store.dispatch(openAnnouncementModal())
  } else if (Number(numAnnounced) < 3) {
    localStorage.setItem(RENDR_MODAL, Number(numAnnounced)  +  1)
    store.dispatch(openAnnouncementModal())
  }
}

export const openKeyBindingsModal = () => ({
  type: types.OPEN_KEY_BINDINGS_MODAL,
  id: 'Key Bindings',
  messages: bindings
})

const bindings = `
  <ul>
    <li>The editor has SublimeText keybindings provided by CodeMirror.</li>
    <li>Additional keys bindings / shortcuts:</li>
    <ul>
      <li><span>Generate Share Link:</span> <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>+</kbd></li>
      <li><span>Scroll through themes:</span> <kbd>CMD/CTRL</kbd> + <kbd>ALT</kbd> + ( <kbd>{</kbd> OR <kbd>}</kbd> )</li>
      <li><span>Next challenge:</span> <kbd>CMD/CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>.</kbd></li>
      <li><span>Previous challenge:</span> <kbd>CMD/CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>,</kbd></li>
      <li><span>Jump to solution / seed:</span> <kbd>CMD/CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>S</kbd></li>
      <li><span>Run code / tests:</span> <kbd>CMD/CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>ENTER</kbd></li>
      <li><span>Toggle Suppress Tests:</span> <kbd>CMD/CTRL</kbd> + <kbd>ALT</kbd> + <kbd>/</kbd></li>
      <li><span>Clear Console:</span> <kbd>ALT</kbd> + <kbd>SHIFT</kbd> + <kbd>DELTE/BACKSPACE</kbd></li>
      <li><span>Open autocomplete dropdown:</span> <kbd>CTRL</kbd> + <kbd>SPACE</kbd></li>
      <li><span>Focus Editor:</span> <kbd>CMD/CTRL</kbd> + <kbd>\\</kbd></li>
    </ul>
    <li>Search / Replace functionalities:</li>
    <ul>
      <li><span>Start searching:</span> <kbd>CMD/CTRL</kbd> + <kbd>F</kbd></li>
      <li><span>Find next:</span> <kbd>CMD/CTRL</kbd> + <kbd>G</kbd></li>
      <li><span>Find previous:</span> <kbd>CMD/CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>G</kbd></li>
      <li><span>Replace:</span> <kbd>CMD</kbd> + <kbd>ALT</kbd> + <kbd>F</kbd> OR <kbd>SHIFT</kbd> + <kbd>CTRL</kbd> + <kbd>F</kbd></li>
      <li><span>Replace all:</span> <kbd>SHIFT</kbd> + <kbd>CMD</kbd> + <kbd>ALT</kbd> + <kbd>F</kbd> OR <kbd>SHIFT</kbd> + <kbd>CTRL</kbd> + <kbd>R</kbd></li>
      <li><span>Jump to line:</span> <kbd>ALT</kbd> + <kbd>G</kbd></li>
    </ul>
  </ul>
`

const newIssue = 'https://github.com/no-stack-dub-sack/cs-playground-react/issues/new'
const README = 'https://github.com/no-stack-dub-sack/cs-playground-react/blob/master/README.md'
const CHANGELOG = 'https://github.com/no-stack-dub-sack/cs-playground-react/blob/master/CHANGELOG.md'

const announcements = [
  `<span>CS-Playground-React</span> has once again undergone a major upgrade and has some
   awesome new features! Here are the highlights:`,
  `<span>Create your own REPLs:</span> Now, in addition to working through our challenges,
   you can also create your own JavaScript REPLs (Read-Eval-Print-Loop). Try new problems,
   jot down ideas, or practice algorithms you've already solved &mdash; these are empty
   slates for you to do anything you want! Scroll to the bottom of the sidebar menu and
   press the <kbd>+</kbd> icon to get started.`,
  `<span>Share your code!</span> Have a cool idea you want to share from one of your new
   REPLs, or want to compare solutions to a hard problem with a friend? Now you can generate
   a share link to do just that! Expand the hamburger menu to the right of the console and
   click the Share icon to generate your first link. Click on the toast to copy it to the
   clipboard automatically. This action can also be triggered from the keyboard using
   <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>+</kbd>. Send the link to a friend to let them see
   the contents of your editor when you generated the link!`,
  `<span>Key Bindings Modal:</span> CS-Playground-React has many key bindings and shortcut
   keys, many of which you probably didn't know existed - for example, tired of the default
   theme? Use <kbd>CMD/CTRL</kbd> + <kbd>ALT</kbd> + <kbd>}</kbd> to scroll through more than
   10 different options! To see a full list of key bindings, click the "Show Key Bindings Modal"
   button hidden in the hamburger menu to the right of the console.`,
  `Don't forget about our <span>built-in tests</span>, <span>new themes</span>, and and other new
   features from our last upate! Check out the <a href=
   ${README} rel="noopener noreferrer" target="_blank">README</a> and the <a href=${CHANGELOG} rel=
   "noopener noreferrer" target="_blank">CHANGELOG</a> for a full list of features and recent changes
   I hope you enjoy! If you have comments or concerns, feel free to <a href=${newIssue} rel="noopener
   noreferrer" target="_blank">open an issue</a>.`
]
