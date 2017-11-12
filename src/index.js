import './index.css';
import App from './App';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import { hijackConsole } from './actions/console';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/rootReducer';
import simpleDrag from './utils/simpleDrag';

// enable resizable split panes
simpleDrag();

// hijack console.log() function
hijackConsole();

export const store = createStore(
  rootReducer,
  composeWithDevTools()
);

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <Provider store={store} >
        <NextApp />
      </Provider>,
      document.getElementById('root')
    );
  });
}

registerServiceWorker();
