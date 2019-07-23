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
  let params = new URLSearchParams()
  let url = `donations/list-by-donator/${id}`

  if (status !== null)
    params.append('status', status)

  if (startFrom && finishTo)
    params.append('startFrom', startFrom)
    params.append('finishTo', finishTo)

  return authRequest().get(url, { params })
}

export function storeApi (data) {
  let formData = new FormData()
  formData.append('name', data.name)
  formData.append('campaign_id', data.campaign_id)
  formData.append('amount', data.amount)
  formData.append('category', data.category)
  formData.append('email', data.email)
  formData.append('phone', data.phone)
  formData.append('image_file', data.image_file)
  data.donation_items.map((item, key) => {
    return formData.append('donation_items['+key+']', JSON.stringify(item))
  })
  return authRequest().post('/donations/create', formData)
}

export function getDonationList (type, fund = 1) {
  return authRequest().get('campaigns?f='+fund+'&t='+type)
}

export function showTransaction(transactionId){
  return authRequest().get('/reports/'+transactionId,)
}