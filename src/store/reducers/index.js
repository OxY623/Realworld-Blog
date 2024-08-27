import { combineReducers } from 'redux'

import articlesReducer from './articlesReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  articles: articlesReducer,
  auth: authReducer,
})

export default rootReducer
