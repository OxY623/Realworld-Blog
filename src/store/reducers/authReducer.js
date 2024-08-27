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
  // Логирование для отладки
  //console.log('Action:', action)
  //console.log('State before:', state)

  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case AUTH_SUCCESS:
      // Логирование для отладки
      //console.log('SIGNUP/SIGNIN SUCCESS Payload:', action.payload)

      return {
        ...state,
        loading: false,
        user: action.payload?.user,
        updateUser: true,
        isAuthenticated: !!action.payload?.user, // Если пользователь есть, то isAuthenticated = true
      }

    case AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload || state.error,
        isAuthenticated: false, // В случае ошибки сбрасываем аутентификацию
      }

    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false, // Пользователь выходит, сбрасываем аутентификацию
      }

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload?.user || state.user,
        isAuthenticated: !!(action.payload?.user || state.user), // Проверка существования пользователя
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        updateUserSuccess: true,
        user: action.payload?.user || state.user, // Обновляем данные пользователя после изменения
      }

    case CLEAR_UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        updateUserSuccess: false,
      }

    default:
      return state
  }
}

export default authReducer
