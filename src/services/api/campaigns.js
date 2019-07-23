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

export function getCampaignApi (campaignId) {
  return authRequest().get(`/campaigns/${campaignId}`)
}

export function toggleCampaignApi (campaignId, attribute) {
  return authRequest().put(`/campaigns/${campaignId}/toggle/${attribute}`)
}

export function createCampaignApi (campaign) {
  const formData = new window.FormData()
  formData.append('title', campaign.title)
  formData.append('description', campaign.description)
  return authRequest().post('/campaigns', formData)
}
