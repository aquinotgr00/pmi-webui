import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function listVillageApi (params) {
  cancel && cancel()

  return authRequest().get('/settings/village', { params,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function detailsVillageApi(villageId){
  return authRequest().get(`/settings/village/${villageId}`)		
}

export function storeVillageApi(params){
    return authRequest().post('/settings/village', params) 
}

export function updateVillageApi(villageId,params){
    return authRequest().put(`/settings/village/${villageId}`, params) 
}

export function deleteVillageApi(villageId){
    return authRequest().delete(`/settings/village/${villageId}`) 
}