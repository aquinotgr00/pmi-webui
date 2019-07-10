export const login = token => ({
  type: 'USER_LOGIN',
  token
})

export const logout = () => ({
  type: 'USER_LOGOUT'
})