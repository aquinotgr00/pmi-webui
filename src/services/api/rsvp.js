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

function buildRsvpFormData (rsvp) {
  const formData = new FormData()
  formData.append('title', rsvp.title)
  formData.append('village_id', rsvp.village_id)
  formData.append('description', rsvp.description)
  formData.append('image_file', rsvp.image)

  return formData
}

export function createRsvpApi (rsvp) {
  const formData = buildRsvpFormData(rsvp)

  return authRequest().post(`/events/report`, formData)
}

export function updateRsvpApi (rsvpId, data) {
  cancel && cancel()
  return authRequest().put(`/events/report/${rsvpId}`, { ...data,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function getRsvpApi (rsvpId) {
  cancel && cancel()

  return authRequest().get(`/events/report/${rsvpId}`, {
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}