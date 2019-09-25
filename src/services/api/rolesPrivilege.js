import { authRequest } from 'utils/network'

export function listrolePrivilegesApi (params) {
  return authRequest().get('/grant/rolesprivileges', { params })
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
  