import * as types from './types';
import { store } from '../index';
import { disableLogAction } from '../reducers/editor';

export const clearConsole = () => ({ type: types.CLEAR_CONSOLE });

export const hijackConsole = () => {
  if (!disableLogAction) {
  const OG_Log = console.log;
    console.log = function(...args) {
      const messages = [...args].map(msg => {
        // NOTE: Do not attempt to stringify doubly linked list nodes
        if (typeof msg === 'object' &&
            msg !== null &&
            msg.hasOwnProperty('prev')) {
          return msg;
        }
        return typeof msg !== 'string'
          ? JSON.stringify(msg)
          : msg
      }).join(' ');
      store.dispatch({
        type: types.CONSOLE_LOG,
        messages
      });
      OG_Log.apply(console, [...args]);
    }
  }
}
