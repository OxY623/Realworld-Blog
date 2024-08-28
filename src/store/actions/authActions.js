import {
  fetchSignUp,
  fetchSignIn,
  getCurrentUser,
  updateCurrentUser,
} from '../../api'

import {
  AUTH_REQUEST,
  AUTH_FAILURE,
  AUTH_SUCCESS,
  LOGOUT,
  FETCH_USER_SUCCESS,
  SET_TOKEN,
  UPDATE_USER_SUCCESS,
} from './actionTypes'

export const signUpUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_REQUEST })
    try {
      const response = await fetchSignUp(userData)
      const token = response.data.user.token

      dispatch({ type: SET_TOKEN, payload: { token } })
      dispatch({ type: AUTH_SUCCESS, payload: response.data })
    } catch (error) {
      dispatch({
        type: AUTH_FAILURE,
        payload:
          error.response?.data.errors || 'Произошла непредвиденная ошибка',
      })
    }
  }
}

export const signInUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_REQUEST })
    try {
      const response = await fetchSignIn(userData)
      const token = response.data.user.token

      dispatch({ type: SET_TOKEN, payload: { token } })
      dispatch({ type: AUTH_SUCCESS, payload: response.data })
    } catch (error) {
      dispatch({
        type: AUTH_FAILURE,
        payload:
          error.response?.data.errors || 'Произошла непредвиденная ошибка',
      })
    }
  }
}

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT })
}

export const getUser = () => async (dispatch) => {
  try {
    const response = await getCurrentUser()
    const token = response.data.user.token

    dispatch({ type: SET_TOKEN, payload: { token } })
    dispatch({ type: FETCH_USER_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({
      type: AUTH_FAILURE,
      payload:
        error.message ||
        'Произошла непредвиденная ошибка при получении пользователя',
    })
  }
}

export const updateUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await updateCurrentUser(userData)
      dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data })
    } catch (error) {
      dispatch({
        type: AUTH_FAILURE,
        payload:
          error.message ||
          'Произошла непредвиденная ошибка при обновлении пользователя',
      })
    }
  }
}
