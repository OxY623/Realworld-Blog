import {
  fetchArticles,
  fetchCreateArticle,
  fetchDeleteArticle,
  fetchUpdateArticle,
  fetchArticle,
} from '../../api'

import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAILURE,
  SET_PAGE,
  CREATE_ARTICLE,
  EDIT_ARTICLE,
  DELETE_ARTICLE,
} from './actionTypes'

// Общие Actions
export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
})

// Экшены для списка статей
export const fetchArticlesRequest = () => ({
  type: FETCH_ARTICLES_REQUEST,
})

export const fetchArticlesSuccess = (data, page) => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: {
    articles: data.articles,
    totalArticles: data.articlesCount,
  },
  page,
  totalPages: Math.floor(data.articlesCount / 5),
})

export const fetchArticlesFailure = (error) => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: error,
})

// Экшены для одной статьи
export const fetchArticleRequest = () => ({
  type: FETCH_ARTICLE_REQUEST,
})

export const fetchArticleSuccess = (article) => ({
  type: FETCH_ARTICLE_SUCCESS,
  payload: article,
})

export const fetchArticleFailure = (error) => ({
  type: FETCH_ARTICLE_FAILURE,
  payload: error,
})

// Thunk для получения списка статей
export const getArticles = (page) => {
  return async (dispatch) => {
    dispatch(fetchArticlesRequest())

    try {
      const data = await fetchArticles(page)
      dispatch(fetchArticlesSuccess(data, page))
    } catch (error) {
      dispatch(fetchArticlesFailure(error.message))
    }
  }
}

// Thunk для создания статьи
export const createArticle = (data) => async (dispatch) => {
  try {
    const response = await fetchCreateArticle(data)

    dispatch({
      type: CREATE_ARTICLE,
      payload: response.data.article,
    })
  } catch (error) {
    dispatch(fetchArticleFailure(error.message))
  }
}

// Thunk для редактирования статьи
export const editArticle = (slug, data) => async (dispatch) => {
  try {
    const response = await fetchUpdateArticle(slug, data)

    dispatch({
      type: EDIT_ARTICLE,
      payload: response.data.article,
    })
  } catch (error) {
    dispatch(fetchArticleFailure(error.message))
  }
}

// Thunk для удаления статьи
export const deleteArticle = (slug) => async (dispatch) => {
  try {
    await fetchDeleteArticle(slug)

    dispatch({
      type: DELETE_ARTICLE,
      payload: slug, // передаем только slug, так как это все, что нужно для удаления статьи
    })
  } catch (error) {
    dispatch(fetchArticleFailure(error.message))
  }
}

// Thunk для получения одной статьи по ID
export const fetchArticleById = (id) => async (dispatch) => {
  dispatch(fetchArticleRequest())
  try {
    const article = await fetchArticle(id)
    dispatch(fetchArticleSuccess(article))
  } catch (error) {
    dispatch(fetchArticleFailure(error.message))
  }
}
