import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function listTransactionApi (params) {
  cancel && cancel()

  return authRequest().get('/reports', { params,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}
