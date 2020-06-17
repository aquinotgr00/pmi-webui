import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import authToken from './authToken'

let middleware = [thunk, authToken]
if(process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, logger]
}
export default applyMiddleware(...middleware)
