import * as types from './types';
import { store } from '../index';
import { startCase } from 'lodash';

export const openResourcesModal = (id) => ({
  type: types.OPEN_RESOURCES_MODAL,
  id: startCase(id)
});

export const openAnnouncementModal = () => ({
  type: types.OPEN_ANNOUNCEMENT_MODAL,
  id: 'Announcement!',
  subHeader: messages[0],
  messages: messages.slice(1)
});

export const closeModal = () => ({ type: types.CLOSE_MODAL });

// render announemnet util
// render only first 3 visits
export function renderAnnouncementUtil() {
  const lsKey = 'cs-pg-react-render-only-thrice';
  let ls = localStorage.getItem(lsKey);
  if (!ls) {
    localStorage.setItem(lsKey, 1);
    store.dispatch(openAnnouncementModal());
  } else if (ls < 3) {
    localStorage.setItem(lsKey, Number(ls) + 1);
    store.dispatch(openAnnouncementModal());
  }
}

const newIssue = 'https://github.com/no-stack-dub-sack/cs-playground-react/issues/new';

const messages = [
  `<span>CS-Playground-React</span> has some new features! Some are rather
   subtle improvements, but the most important of these is
   <span>Automated Testing</span>:`,
  `When this feature is enabled, every time you run your code,
   a test suite will run in the background, and the results will
   log to the console.`,
  `<span>NOTE:</span> Tests are disabled by default to keep unwanted noise in the
   console down to a minimum. Delete the <code>// SUPPRESS TESTS</code>
   &nbsp;comment to enable.`,
   `I hope you enjoy! If you have comments or concerns,
   feel free to <a href=${newIssue} rel="noopener noreferrer"
   target="_blank">open an issue</a>.`
];
