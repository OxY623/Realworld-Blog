import { fetchSingUp, fetchSignIn, fetchGetUser } from '../../api'

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from './actionTypes'

export const signUpUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST })
    try {
      const response = await fetchSingUp(userData)
      const data = response.data
      localStorage.setItem('token', data.user.token) // Store token

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: SIGNUP_FAILURE,
        payload: error.response?.data.errors || 'Unexpected error occurred',
      })
    }
  }
}

export const signInUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: SIGNIN_REQUEST })
    try {
      const response = await fetchSignIn(userData)
      const data = response.data
      localStorage.setItem('token', data.user.token) // Store token

      dispatch({
        type: SIGNIN_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: SIGNIN_FAILURE,
        payload: error.response?.data.errors || 'Unexpected error occurred',
      })
    }
  }
}

export const logout = () => (dispatch) => {
  //localStorage.removeItem('token')
  dispatch({ type: LOGOUT })
}

export const getUser = () => async (dispatch) => {
  try {
    const response = await fetchGetUser()
    dispatch({ type: FETCH_USER_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({
      type: FETCH_USER_FAILURE,
      error: error.message || 'Failed to fetch user',
    })
  }
}

// Action to set the user as logged in
export const setLoggedIn = (data) => ({ type: SIGNIN_SUCCESS, payload: data })

// Action to set the user as logged out
export const setUnloggedIn = () => ({ type: LOGOUT })
