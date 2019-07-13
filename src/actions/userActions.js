import { loginApi, logoutApi } from 'services/api'
import { persistor } from 'store'


export function login(credentials) {
  return async function(dispatch, getState) {
    dispatch({
      type: 'LOGIN_REQUEST',
      credentials
    })

    const loginResponse = await loginApi(credentials)
    
    const { status,data } = loginResponse.data
    if(status==='success') {
      const { token } = data
      dispatch({
        type: 'LOGIN_SUCCESS',
        token
      })
    }
    else {
      const { account } = data
      dispatch({
        type: 'LOGIN_FAILURE',
        account
      })
    }
    
  }
}

export function logout() {
  return async function(dispatch, getState) {
    dispatch({
      type: 'LOGOUT_REQUEST'
    })
    
    const logoutResponse = await logoutApi()
    console.log(logoutResponse)

    persistor.purge()
    
    dispatch({
      type: 'LOGOUT_SUCCESS'
    })

    //
    //

    /*
    const { status,data } = logoutResponse.data
    if(status==='success') {
      dispatch({
        type: 'LOGOUT_SUCCESS'
      })
    }
    else {
      const { account } = data
      dispatch({
        type: 'LOGOUT_FAILURE',
        account
      })
    }
    */
  }
}

export const showConfirmLogout = () => ({
  type: 'SHOW_CONFIRM_LOGOUT'
})

export const hideConfirmLogout = () => ({
  type: 'HIDE_CONFIRM_LOGOUT'
})

export const toggleConfirmLogout = () => ({
  type: 'TOGGLE_CONFIRM_LOGOUT'
})
