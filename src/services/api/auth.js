import { authRequest, basicRequest } from 'utils/network'

export function login (credential) {
  basicRequest().post('/login', credential)
}

export function logout () {
  authRequest().get('/admin/logout')
}
