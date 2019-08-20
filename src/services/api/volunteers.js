import { authRequest } from 'utils/network'

export function getVolunteerList (params) {
  return authRequest().get('volunteers',{params})
}

export function getSubdistrictListApi (params) {
  return authRequest().get('settings/subdistrict',{params})
}

export function getUnitListApi (params) {
  return authRequest().get('settings/unit',{params})
}
