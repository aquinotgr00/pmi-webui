import { authRequest } from 'utils/network'

export function listCampaignApi () {
  return authRequest().get('/campaigns')
}
