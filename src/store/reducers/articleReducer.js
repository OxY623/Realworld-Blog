import {
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAILURE,
} from '../actions/actionTypes'

const initialState = {
  article: null,
  loading: false,
  error: null,
}

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLE_REQUEST:
      return { ...state, loading: true }
    case FETCH_ARTICLE_SUCCESS:
      return { ...state, article: action.payload, loading: false }
    case FETCH_ARTICLE_FAILURE:
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

export default articleReducer
