import { setAuthToken } from 'utils/network'

export default (store) => next => action => {
  switch (action['type']) {
    case 'LOGIN_SUCCESS':
      setAuthToken(action.token)
      return next(action)
    case 'persist/REHYDRATE':
      let result = next(action)
      const { token } = store.getState().user
      if (token) {
        setAuthToken(token)
      }
      return result
    case 'LOGOUT_SUCCESS':
      setAuthToken(null)
      return next(action)
    default:
      return next(action)
  }
}
