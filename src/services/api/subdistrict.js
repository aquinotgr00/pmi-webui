import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function listSubdistrictApi (params) {
  cancel && cancel()

  return authRequest().get('/settings/subdistrict', { params,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function detailsSubdistrictApi(subdistrictId){
	cancel && cancel()
  	return authRequest().get('/settings/subdistrict/'+subdistrictId, { 
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })	
}

export function storeSubdistrictApi(params){
    return authRequest().post('/settings/subdistrict', params) 
}

export function updateSubdistrictApi(subdistrictId,params){
    return authRequest().put(`/settings/subdistrict/${subdistrictId}`, params) 
}

export function deleteSubdistrictApi(subdistrictId){
    return authRequest().delete(`/settings/subdistrict/${subdistrictId}`) 
}
  