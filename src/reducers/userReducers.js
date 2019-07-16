const user = (state = { token: null, showConfirmLogout: false }, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, token: action.token }
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
