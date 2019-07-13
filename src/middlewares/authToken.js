import { setAuthToken } from 'utils/network'

export default (store) => next => action => {
  switch (action['type']) {
    case 'LOGIN_SUCCESS':
      setAuthToken(action.token)
      break
    case 'persist/REHYDRATE':
      const { token } = action.payload.user
      setAuthToken(token)
      break;
    case 'LOGOUT_SUCCESS':
      setAuthToken(null)
      break
    default:
  }

  return next(action)
}
