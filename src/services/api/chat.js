import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function getEventActivityApi (params) {
  cancel && cancel()

  return authRequest().get('/events/comment', { params,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}