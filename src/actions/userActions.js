export const login = token => ({
  type: 'USER_LOGIN',
  token
})

export const logout = () => ({
  type: 'USER_LOGOUT'
})

export const showConfirmLogout = () => ({
  type: 'SHOW_CONFIRM_LOGOUT'
})

export const hideConfirmLogout = () => ({
  type: 'HIDE_CONFIRM_LOGOUT'
})

export const toggleConfirmLogout = () => ({
  type: 'TOGGLE_CONFIRM_LOGOUT'
})