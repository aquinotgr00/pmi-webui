import { storeUserApi } from 'services/api'

export function storeNewAdmin (values) {
  return async function (dispatch, getState) {
    dispatch({
      type: 'STORE_REQUEST',
      values
    })

    const storeResponse = await storeUserApi(values)
    console.log(storeResponse)
    const { status, data } = storeResponse.data
    if (status === 'success') {
      const { token } = data
      dispatch({
        type: 'STORE_SUCCESS',
        token
      })
    } else {
      const { account } = data
      dispatch({
        type: 'STORE_FAILURE',
        account
      })
    }
  }
}