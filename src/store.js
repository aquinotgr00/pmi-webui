import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from 'reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(logger))
  let persistor = persistStore(store)
  return { store, persistor }
}