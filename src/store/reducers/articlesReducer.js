import {
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAILURE,
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  SET_PAGE,
  CREATE_ARTICLE,
  EDIT_ARTICLE,
  DELETE_ARTICLE,
} from '../actions/actionTypes'

const initialState = {
  article: null,
  articles: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  totalArticles: 0,
}

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    // Для одного артикула
    case FETCH_ARTICLE_REQUEST:
    case FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload,
        loading: false,
      }

    case FETCH_ARTICLE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        article: null,
      }

    // Для нескольких артикулов
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.payload.articles,
        totalPages: action.payload.totalPages,
        totalArticles: action.payload.totalArticles,
        error: null,
      }

    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    // Пагинация
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      }

    // CRUD операции
    case CREATE_ARTICLE:
      return {
        ...state,
        article: action.payload,
        articles: [action.payload, ...state.articles],
        loading: false,
        error: null,
      }

    case EDIT_ARTICLE:
      return {
        ...state,
        article: action.payload,
        articles: state.articles.map((article) =>
          article.slug === action.payload.slug ? action.payload : article,
        ),
        loading: false,
        error: null,
      }

    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(
          (article) => article.slug !== action.payload,
        ),
        loading: false,
        error: null,
      }

    default:
      return state
  }
}

export default articlesReducer
