const user = (state = { isLoggingIn: false, token: null, showConfirmLogout: false, loginError: null }, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, isLoggingIn: true, loginError: null }
    case 'LOGIN_SUCCESS':
      return { ...state, isLoggingIn: false, token: action.token }
    case 'LOGIN_FAILURE':
      return { ...state, isLoggingIn: false, loginError: action.account }
    case 'LOGOUT_SUCCESS':
      return { token: null, showConfirmLogout: false }
    case 'SHOW_CONFIRM_LOGOUT':
      return { ...state, showConfirmLogout: true }
    case 'TOGGLE_CONFIRM_LOGOUT':
      return { ...state, showConfirmLogout: !state.showConfirmLogout }
    default:
      return state
  }
}

export default user
