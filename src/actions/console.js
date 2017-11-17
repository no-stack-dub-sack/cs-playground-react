import { store } from '../index';

export const CLEAR_CONSOLE = 'CLEAR_CONSOLE';
export const CONSOLE_LOG = 'CONSOLE_LOG';

export const clearConsole = () => {
  return {
    type: CLEAR_CONSOLE
  }
};

export const hijackConsole = () => {
  const oldLog = console.log;
  console.log = function(...args) {
    const messages = [...args].map(msg => {
      return typeof msg !== 'string'
        ? JSON.stringify(msg)
        : msg
    }).join(' ');
    store.dispatch({
      type: CONSOLE_LOG,
      messages
    });
    oldLog.apply(console, arguments);
  };
};
