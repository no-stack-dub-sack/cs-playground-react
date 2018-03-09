// @flow
import { applyMiddleware, createStore } from 'redux'

import type { Action } from './types/Actions'
import type { Store as ReduxStore } from 'redux'
import type { State } from './types/State'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer'

export type Store = ReduxStore<State, Action>

export default function configureStore(): Store {
  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware()
    )
  )
}
