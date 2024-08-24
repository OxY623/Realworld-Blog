import { fetchSingUp, fetchSignIn } from '../../api'

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNIN_REQUEST,
  LOGOUT,
} from './actionTypes'

export const signUpUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST })
    try {
      const response = await fetchSingUp(userData)
      const data = response.data
      //localStorage.setItem('user', JSON.stringify(data))
      localStorage.setItem('token', data.user.token)

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.errors
          : 'Unexpected error occurred'

      dispatch({
        type: SIGNUP_FAILURE,
        payload: errorMessage,
      })
    }
  }
}

export const signInUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: SIGNIN_REQUEST })
    try {
      const token = localStorage.getItem('token')
      const response = await fetchSignIn(userData, token)
      const data = response.data
      localStorage.setItem('user', JSON.stringify(data))
      //localStorage.setItem('token', data.user.token)

      dispatch({
        type: SIGNIN_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.errors
          : 'Unexpected error occurred'

      dispatch({
        type: SIGNIN_FAILURE,
        payload: errorMessage,
      })
    }
  }
}

export const logout = () => (dispatch) => {
  //localStorage.removeItem('user')
  //localStorage.removeItem('token')
  dispatch({ type: LOGOUT })
}
