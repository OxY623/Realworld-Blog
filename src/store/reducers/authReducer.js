import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  FETCH_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  CLEAR_UPDATE_USER_SUCCESS,
  LOGOUT,
} from '../actions/actionTypes'

const initialState = {
  user: null,
  isAuthenticated: false,
  updateUserSuccess: false,
  loading: false,
  error: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload?.user,
        updateUserSuccess: false,
        isAuthenticated: !!action.payload?.user,
      }

    case AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload || 'Произошла ошибка аутентификации',
        isAuthenticated: false,
      }

    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        updateUserSuccess: false,
      }

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload?.user || state.user,
        isAuthenticated: !!(action.payload?.user || state.user),
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        updateUserSuccess: true,
        user: action.payload?.user || state.user,
      }

    case CLEAR_UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateUserSuccess: false,
      }

    default:
      return state
  }
}

export default authReducer
