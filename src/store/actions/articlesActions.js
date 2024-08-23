import { fetchArticles } from '../../api'

import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  SET_PAGE,
} from './actionTypes'

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
})

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
