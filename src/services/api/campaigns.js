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

function buildCampaignFormData (campaign) {
  const formData = new FormData()
  formData.append('type_id', campaign.type_id)
  formData.append('fundraising', campaign.fundraising ? 1 : 0)
  formData.append('title', campaign.title)
  formData.append('description', campaign.description)
  formData.append('image_file', campaign.image_file)
  formData.append('publish', campaign.publish)
  formData.append('amount_goal', campaign.amount_goal)
  formData.append('start_campaign', campaign.start_campaign)
  formData.append('finish_campaign', campaign.finish_campaign)

  return formData
}

export function createCampaignApi (campaign) {
  const formData = buildCampaignFormData(campaign)

  return authRequest().post('/campaigns', formData)
}

export function updateCampaignApi (campaignId, campaign) {
  const formData = buildCampaignFormData(campaign)
  if (!campaign.image_file) {
    formData.delete('image_file')
  }
  formData.append('_method', 'put')
  return authRequest().post(`/campaigns/${campaignId}`, formData)// ?id=${campaignId}
}

export function updateFinishCampaignApi(campaignId,params){
  return authRequest().post( `/campaigns/update/finish/${campaignId}`, params) 
}