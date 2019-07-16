import { authRequest, basicRequest } from 'utils/network'

export function loginApi (credentials) {
  return basicRequest().post('/login', credentials)
}

export function logoutApi () {
  return authRequest().get('/logout')
}
