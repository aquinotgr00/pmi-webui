import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function listUnitApi(params) {
  cancel && cancel()

  return authRequest().get('/settings/unit', {
    params,
    cancelToken: new CancelToken(function executor(c) {
      cancel = c
    })
  })
}

export function detailsUnitApi(unitId) {
  return authRequest().get(`/settings/unit/${unitId}`)
}

export function storeUnitApi(params) {
  return authRequest().post('/settings/unit', params)
}

export function updateUnitApi(unitId, params) {
  return authRequest().put(`/settings/unit/${unitId}`, params)
}

export function deleteUnitApi(unitId) {
  return authRequest().delete(`/settings/unit/${unitId}`)
}
