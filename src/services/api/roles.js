import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function listRolesApi (params) {
  cancel && cancel()

  return authRequest().get('/grant/roles', { params,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function detailsRolesApi(roleId){
  return authRequest().get(`/grant/roles/${roleId}`)
}

export function storeRolesApi(params){
    return authRequest().post('/grant/roles', params) 
}

export function updateRolesApi(roleId,params){
    return authRequest().put(`/grant/roles/${roleId}`, params) 
}

export function deleteRolesApi(roleId){
    return authRequest().delete(`/grant/roles/${roleId}`) 
}
  