import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function listUserApi (params) {
  cancel && cancel()

  return authRequest().get('/users', { params,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function detailsUserApi(userId){
  return authRequest().get(`/users/${userId}`)	
}

export function storeUserApi(params){
  return authRequest().post('/users', params) 
}

export function updateActiveUserApi(userId,status){
  return authRequest().put('users/'+userId+'/'+status) 
}

export function updateUserApi(userId,params){
  return authRequest().put('/users/'+userId, params) 
}