import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function listProvinceApi (params) {
  cancel && cancel()

  return authRequest().get('/settings/province', { params,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function detailsProvinceApi(provinceId){
  return authRequest().get(`/settings/province/${provinceId}`)
}

export function storeProvinceApi(params){
    return authRequest().post('/settings/province', params) 
}

export function updateProvinceApi(provinceId,params){
    return authRequest().put(`/settings/province/${provinceId}`, params) 
}

export function deleteProvinceApi(provinceId){
    return authRequest().delete(`/settings/province/${provinceId}`) 
}
  