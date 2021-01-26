import { applyMiddleware } from 'redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk))
}

export default configureStore
