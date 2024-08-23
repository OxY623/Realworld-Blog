import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  SET_PAGE,
} from '../actions/actionTypes'

const initialState = {
  articles: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  totalArticles: 0,
}

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return { ...state, loading: true, error: null }

    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.payload.articles,
        totalPages: action.totalPages,
        totalArticles: action.payload.totalArticles,
        error: null,
        page: action.page,
      }

    case FETCH_ARTICLES_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case SET_PAGE:
      return { ...state, page: action.payload }

    default:
      return state
  }
}

export default articlesReducer
