// eslint-disable-next-line import/namespace
import { fetchUpdateProfile } from '../../api'

import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
} from './actionTypes'

export const updateProfile = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST })
  // const state = getState()
  // const token = state.auth?.user?.user?.token
  // console.log(token)
  // console.log(data)
  try {
    const response = await fetchUpdateProfile(data)
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: response.data,
    })
  } catch (error) {
    const errors = error.response?.data?.errors || {}
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: errors,
    })
  }
}
