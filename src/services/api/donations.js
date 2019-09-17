import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function listTransactionApi (params) {
  cancel && cancel()

  return authRequest().get('/reports', { params,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function listDonationByStatus (id, status = null, startFrom = null, finishTo = null) {
  const params = new URLSearchParams()
  const url = `donations/list-by-donator/${id}`

  if (status !== null) { params.append('status', status) }

  if (startFrom && finishTo) { params.append('startFrom', startFrom) }
  params.append('finishTo', finishTo)

  return authRequest().get(url, { params })
}

export function storeApi (data) {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('campaign_id', data.campaign_id)
  formData.append('amount', data.amount)
  formData.append('category', data.category)
  formData.append('email', data.email)
  formData.append('phone', data.phone)
  formData.append('image_file', data.image_file)
  formData.append('fundraising', data.fundraising)
  if (typeof data.donation_items !== 'undefined') {
    data.donation_items.map((item, key) => {
      return formData.append('donation_items[' + key + ']', JSON.stringify(item))
    })
  }
  return authRequest().post('/donations', formData)
}

// TODO : investigate why there's campaign list in donation service
export function getDonationList (type, fund = 1) {
  const params = new URLSearchParams()
  params.append('t', type)
  params.append('f', fund)
  params.append('v', 1)
  params.append('a', 1)
  params.append('p', 1)
  params.append('page', 1) // Incorrect. must fetch campaigns WITHOUT pagination instead. 'page'=1 means other pages are hidden!
  return authRequest().get('campaigns', { params })
}

export function showTransaction (transactionId) {
  return authRequest().get('/reports/' + transactionId)
}

export function updateTransaction (transactionId, data) {
  return authRequest().post('/donations/update/' + transactionId, data)
}

export function exportToExcel (params) {
  return authRequest().get('/reports/export/excel', { params })
}

export function exportToPdf (params) {
  return authRequest().get('/reports/export/pdf', { params })
}

export function exportToPrint (params) {
  return authRequest().get('/reports/export/print', { params })
}

export function geyDonatorByCampaignApi (campaignId, params) {
  return authRequest().get(`/donations/list/${campaignId}`, { params })
}
