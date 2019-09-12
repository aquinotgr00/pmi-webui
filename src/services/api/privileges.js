import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function listPrivilegesApi (params) {
  cancel && cancel()

  return authRequest().get('/grant/privileges', { params,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function detailsPrivilegesApi(privilegeId){
  return authRequest().get(`/grant/privileges/${privilegeId}`)
}

export function storePrivilegesApi(params){
    return authRequest().post('/grant/privileges', params) 
}

export function updatePrivilegesApi(privilegeId,params){
    return authRequest().put(`/grant/privileges/${privilegeId}`, params) 
}

export function deletePrivilegesApi(privilegeId){
    return authRequest().delete(`/grant/privileges/${privilegeId}`) 
}
  