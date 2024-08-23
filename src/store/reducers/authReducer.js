import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT,
} from '../actions/actionTypes'

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        //token: action.payload.user.token,
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case SIGNIN_REQUEST:
      return { ...state, loading: true, error: null }
    case SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        token: action.payload.token,
      }
    case SIGNIN_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case LOGOUT:
      return { ...state, user: null, token: null }

    default:
      return state
  }
}

export default authReducer
