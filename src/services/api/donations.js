import { authRequest } from 'utils/network'

export function listTransactionApi (params) {
  return authRequest().get('/reports')
}
