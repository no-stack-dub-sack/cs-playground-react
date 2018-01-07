import { store } from '../index';

export const CLEAR_CONSOLE = 'CLEAR_CONSOLE';
export const CONSOLE_LOG = 'CONSOLE_LOG';

export const clearConsole = () => {
  return {
    type: CLEAR_CONSOLE
  }
};

export const hijackConsole = () => {
  const OG_Log = console.log;
  console.log = function(...args) {
    const messages = [...args].map(msg => {
      // NOTE: Do not attempt to stringify doubly linked list nodes
      if (typeof msg === 'object' && msg.hasOwnProperty('prev')) {
        return msg;
      }
      return typeof msg !== 'string'
        ? JSON.stringify(msg)
        : msg
    }).join(' ');
    store.dispatch({
      type: CONSOLE_LOG,
      messages
    });
    OG_Log.apply(console, [...args]);
  };
};
