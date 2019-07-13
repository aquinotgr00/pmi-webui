import { setAuthToken } from 'utils/network'

export default (store) => next => action => {
  switch (action['type']) {
    case 'USER_LOGIN':
      setAuthToken(action.token)
      break
    case 'USER_LOGOUT':
      setAuthToken(null)
      break
    default:
  }

  return next(action)
}
