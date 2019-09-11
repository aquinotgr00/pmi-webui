import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function listrolePrivilegesApi (params) {
  cancel && cancel()

  return authRequest().get('/grant/rolesprivileges', { params,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function detailsrolePrivilegesApi(roleId){
  return authRequest().get(`/grant/rolesprivileges/${roleId}`)
}

export function storerolePrivilegesApi(params){
    return authRequest().post('/grant/rolesprivileges', params) 
}

export function updaterolePrivilegesApi(roleId,params){
    return authRequest().put(`/grant/rolesprivileges/${roleId}`, params) 
}

export function deleterolePrivilegesApi(roleId){
    return authRequest().delete(`/grant/rolesprivileges/${roleId}`) 
}
  