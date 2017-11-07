import { store } from '../index';

export const UPDATE_CONSOLE = 'UPDATE_CONSOLE';

export default () => {
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
