import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  CLEAR_SUCCESS_MESSAGE,
} from '../actions/actionTypes'

const initialState = {
  loading: false,
  successMessage: '',
  errors: {},
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        successMessage: '',
        errors: {},
      }
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: 'Profile updated successfully!',
      }
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      }
    case CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: '',
      }
    default:
      return state
  }
}

export default profileReducer
