import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import { thunk } from 'redux-thunk'

import LocalStorageAPI from '../api/LocalStorageAPI'

import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, LocalStorageAPI.saveTokenMiddleware),
  ),
)

export default store
