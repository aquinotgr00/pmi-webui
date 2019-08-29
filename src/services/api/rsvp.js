import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function listRsvpApi (params) {
  cancel && cancel()

  return authRequest().get('/events/report', { params,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function archiveRsvpApi (rsvpId) {
  cancel && cancel()
  return authRequest().put(`/events/report/${rsvpId}`, { archived:1,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}