import * as types from './types'
import { RENDR_MODAL } from '../utils/localStorageKeys'
import { store } from '../index'
import { startCase } from 'lodash'

export const openThemeModal = (id) => {
  return {
    type: types.OPEN_THEME_MODAL,
    id: startCase(id)
  }
}

export const openResourcesModal = (id) => ({
  type: types.OPEN_RESOURCES_MODAL,
  id: startCase(id)
})

export const openAnnouncementModal = () => ({
  type: types.OPEN_ANNOUNCEMENT_MODAL,
  id: 'Announcement!',
  subHeader: messages[0],
  messages: messages.slice(1)
})

export const closeModal = () => ({ type: types.CLOSE_MODAL })

// render announemnet util
// render only first 3 visits
export function renderAnnouncementUtil() {
  let ls = localStorage.getItem(RENDR_MODAL)
  if (!ls) {
    localStorage.setItem(RENDR_MODAL, 1)
    store.dispatch(openAnnouncementModal())
  } else if (ls < 3) {
    localStorage.setItem(RENDR_MODAL, Number(ls) + 1)
    store.dispatch(openAnnouncementModal())
  }
}

const newIssue = 'https://github.com/no-stack-dub-sack/cs-playground-react/issues/new'
const README = 'https://github.com/no-stack-dub-sack/cs-playground-react/blob/master/README.md'
const CHANGELOG = 'https://github.com/no-stack-dub-sack/cs-playground-react/blob/master/CHANGELOG.md'

const messages = [
  `<span>CS-Playground-React</span> has undergone a major upgrade and has some
   awesome new features! Some are rather subtle improvements, but here are a few
   of the most important:`,
  `<span>Automated Testing:</span> By far the biggest and most important change,
   when this feature is enabled, every time you run your code, a test suite will
   run in the background, and the results will log to the console. <span>NOTE:
   </span> Tests are disabled by default to keep unwanted noise in the console
   down to a minimum. Delete the <code>// SUPPRESS TESTS</code>&nbsp;
   comment to enable.`,
  `<span>New / Improved Key Bindings:</span> All of the previous navigation key
   bindings (like prev/next challenge) now work with Mac meta keys. There are also
   several new key bindings to make navigation around the app even easier (such as
   clear console and easy toggle between seed and solution code). See the <a href=
   ${README} rel="noopener noreferrer" target="_blank">README</a> for a full list
   of Key Bindings.`,
  `<span>New Themes:</span> If you prefer a light editor, or a different dark
   theme, you can now choose between over 10 UI & editor themes! Some are subtly
   different, while others change the look of the UI completely. Use <code>CMD/
   CTRL + ALT + } or {</code>&nbsp;&nbsp;to scroll through the different themes.
   P.S. If you enjoy UI design, this is an area I could use some help with!`,
  `<span>Editor Enhancements:</span> This upgrade makes use of several CodeMirror
   capabilities that will make your coding experience richer and more realistic.
   For example, search & replace, highlight matching selections, and autocomplete.
   See the <a href=${README} rel="noopener noreferrer" target="_blank">README</a>
   for a full list of the Key Bindings that enable some of these features.`,
  `To see a full list of new features, check out the <a href=${CHANGELOG} rel=
   "noopener noreferrer" target="_blank">CHANGELOG</a>. I hope you enjoy! If you
   have comments or concerns, feel free to <a href=${newIssue} rel="noopener
   noreferrer" target="_blank">open an issue</a>.`
]
