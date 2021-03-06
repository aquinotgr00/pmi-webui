import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function listMembershipApi (params) {
  cancel && cancel()

  return authRequest().get('/settings/membership', { params,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function detailsMembershipApi(membershipId){
	return authRequest().get(`/settings/membership/${membershipId}`)
}

export function storeMembershipApi(params){
    return authRequest().post('/settings/membership', params) 
}

export function updateMembershipApi(membershipId,params){
    return authRequest().put(`/settings/membership/${membershipId}`, params) 
}

export function deleteMembershipApi(membershipId){
    return authRequest().delete(`/settings/membership/${membershipId}`) 
}

export function getAmountVolunteerApi(membershipId){
	return authRequest().get('/dashboard/amount/volunteer')
}
  