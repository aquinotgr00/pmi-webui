import { authRequest } from 'utils/network'

export function storeApi (data) {
  let formData = new FormData()
  formData.append('name', data.name)
  formData.append('campaign_id', data.campaign_id)
  formData.append('amount', data.amount)
  formData.append('category', data.category)
  formData.append('email', data.email)
  formData.append('phone', data.phone)
  formData.append('image_file', data.image_file)
  return authRequest().post('/donations/create', formData)
}