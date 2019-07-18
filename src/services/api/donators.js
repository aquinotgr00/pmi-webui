import { authRequest } from 'utils/network'

export function getDonatorList () {
  return authRequest().get('donators')
}