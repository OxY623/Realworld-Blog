import { combineReducers } from 'redux'

import articlesReducer from './articlesReducer'
import articleReducer from './articleReducer'
import authReducer from './authReducer'
import profileReducer from './profileReducer'

const rootReducer = combineReducers({
  articles: articlesReducer,
  article: articleReducer,
  auth: authReducer,
  profile: profileReducer,
})

export default rootReducer
