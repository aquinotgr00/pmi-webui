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
  const formData = new FormData()
  formData.append('type_id', campaign.type_id)
  formData.append('fundraising', campaign.fundraising ? 1 : 0)
  formData.append('title', campaign.title)
  formData.append('description', campaign.description)
  formData.append('image_file', campaign.image_file)
  formData.append('publish', campaign.publish)
  formData.append('amount_goal', campaign.amount_goal)
  return authRequest().post('/campaign', formData)
}

export function updateCampaignApi (campaignId, campaign) {
  return authRequest().put(`/campaigns/${campaignId}?id=${campaignId}`, campaign)
}
