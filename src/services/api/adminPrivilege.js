import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function listadminPrivilegesApi (params) {
  cancel && cancel()

  return authRequest().get('/grant/adminprivileges', { params,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
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
  