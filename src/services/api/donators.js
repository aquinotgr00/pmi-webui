import { authRequest } from 'utils/network'

export function getDonator(donatorId) {
  return authRequest().get('donators/show/'+donatorId)
}

export function getDonatorList (params) {
  return authRequest().get('donators',{params})
}

export function postUpdateDonator (donatorId,params) {
  return authRequest().post(`donators/update/${donatorId}`, params )
}