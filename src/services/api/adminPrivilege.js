import axios from 'axios'
import { authRequest } from 'utils/network'

export function listadminPrivilegesApi (params) {
  return authRequest().get('/grant/adminprivileges', { params }) 
}

export function detailsadminPrivilegesApi(adminId){
  return authRequest().get(`/grant/adminprivileges/${adminId}`)
}

export function storeadminPrivilegesApi(params){
    return authRequest().post('/grant/adminprivileges', params) 
}

export function updateadminPrivilegesApi(adminId,params){
    return authRequest().put(`/grant/adminprivileges/${adminId}`, params) 
}

export function deleteadminPrivilegesApi(adminId){
    return authRequest().delete(`/grant/adminprivileges/${adminId}`) 
}
  