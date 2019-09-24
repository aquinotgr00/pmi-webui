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

function buildEventActivityFormData (activity) {
  const formData = new FormData()
  formData.append('event_report_id', activity.event_report_id)
  formData.append('comment', activity.comment)

  return formData
}

export function postEventActivityApi (comment) {
  const formData = buildEventActivityFormData(comment)

  return authRequest().post('/events/comment', formData)
}