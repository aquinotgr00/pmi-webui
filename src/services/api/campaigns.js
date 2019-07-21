import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function listCampaignApi (params) {
  cancel && cancel()

  return authRequest().get('/campaigns', { params,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function viewCampaignApi (campaignId) {
  return authRequest().get(`/campaigns/${campaignId}`)
}

export function toggleCampaignApi (campaignId, attribute) {
  return authRequest().put(`/campaigns/${campaignId}/toggle/${attribute}`)
}
