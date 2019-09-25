import { authRequest } from 'utils/network'

export function listPrivilegesApi (params) {
  return authRequest().get('/grant/privileges', { params }) 
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
  