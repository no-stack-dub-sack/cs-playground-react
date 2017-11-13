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
import './styles/index.css';
import ErrorBoundary from './components/utils/ErrorBoundary';

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
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
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
