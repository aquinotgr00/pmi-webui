import { authRequest } from 'utils/network'

export function getVolunteerList (params) {
  return authRequest().get('volunteers',{params})
}

export function getVolunteerApi (volunteerId) {
  return authRequest().get('volunteers/'+volunteerId)
}

export function postVolunteerUpdateApi (volunteerId, data) {
  return authRequest().post(`volunteers/${volunteerId}`, data)
}

export function volunteerApproveOrDelete (volunteerId, data) {
  return authRequest().post(`approve-volunteer/${volunteerId}`, data)
}

export function getParentMemberListApi () {
  return authRequest().get('settings/membership')
}

export function getMembershipListApi (params) {
  return authRequest().get('settings/membership', {params})
}

export function getSubdistrictListApi (params) {
  return authRequest().get('settings/subdistrict',{params})
}

export function getUnitListApi (params) {
  return authRequest().get('settings/unit',{params})
}

export function exportVolunteerToPdfApi (params) {
  return authRequest().get('export-volunteers/print',{params})
}
