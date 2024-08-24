import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  FETCH_USER_SUCCESS,
  LOGOUT,
} from '../actions/actionTypes'

// Начальное состояние
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
}

// Редуктор аутентификации
const authReducer = (state = initialState, action) => {
  // Логирование для отладки
  console.log('Action:', action)
  console.log('State before:', state)

  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case SIGNUP_SUCCESS:
      // Логирование для отладки
      console.log('SIGNUP_SUCCESS Payload:', action.payload)

      return {
        ...state,
        loading: false,
        user: action.payload?.user, //|| state.user, // Используйте значения по умолчанию
        //token: action.payload?.token || state.token, // Добавьте если нужно
      }

    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload || state.error,
      }

    case SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case SIGNIN_SUCCESS:
      // Логирование для отладки
      console.log('SIGNIN_SUCCESS Payload:', action.payload)

      return {
        ...state,
        loading: false,
        user: action.payload?.user || state.user,
        token: action.payload?.token || state.token,
      }

    case SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload || state.error,
      }

    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
      }
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload?.user || state.user,
        token: action.payload?.token || state.token,
      }

    default:
      return state
  }
}

export default authReducer
