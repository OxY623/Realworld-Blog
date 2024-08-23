import { combineReducers } from 'redux'

import articlesReducer from './articlesReducer'
import articleReducer from './articleReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  articles: articlesReducer,
  article: articleReducer,
  auth: authReducer,
})

export default rootReducer
