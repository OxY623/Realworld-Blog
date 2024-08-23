import { fetchArticle } from '../../api'

import {
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLE_REQUEST,
} from './actionTypes'

export const fetchArticleRequest = () => ({
  type: FETCH_ARTICLE_REQUEST,
})

export const fetchArticleSuccess = (article) => ({
  type: FETCH_ARTICLE_SUCCESS,
  payload: article,
})

export const fetchArticleFailure = (error) => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: error,
})

export const fetchArticleById = (id) => async (dispatch) => {
  dispatch(fetchArticleRequest())
  try {
    const article = await fetchArticle(id)
    dispatch(fetchArticleSuccess(article))
  } catch (error) {
    dispatch(fetchArticleFailure(error.message))
  }
}
