import { authRequest } from 'utils/network'

export function getVolunteerList (params) {
  return authRequest().get('volunteers',{params})
}
