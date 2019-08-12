import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function listCityApi (params) {
  cancel && cancel()

  return authRequest().get('/settings/city', { params,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function detailsCityApi(cityId){
	cancel && cancel()
  	return authRequest().get('/settings/city/'+cityId, { 
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })	
}

export function storeCityApi(params){
    return authRequest().post('/settings/city', params) 
}

export function updateCityApi(cityId,params){
    return authRequest().put(`/settings/city/${cityId}`, params) 
}

export function deleteCityApi(cityId){
    return authRequest().delete(`/settings/city/${cityId}`) 
}
  