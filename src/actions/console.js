import { store } from '../index';

export const CLEAR_CONSOLE = 'CLEAR_CONSOLE';
export const UPDATE_CONSOLE = 'UPDATE_CONSOLE';

export const clearConsole = () => {
  return {
    type: CLEAR_CONSOLE
  }
};

export const hijackConsole = () => {
  const oldLog = console.log;
  console.log = function(message) {
    store.dispatch({
      type: UPDATE_CONSOLE,
      message: typeof message !== 'string'
        ? JSON.stringify(message)
        : message
    });
    oldLog.apply(console, arguments);
  };
};
