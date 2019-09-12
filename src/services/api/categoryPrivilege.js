import axios from 'axios'
import { authRequest } from 'utils/network'

const CancelToken = axios.CancelToken
let cancel

export function listCategoryPrivilegesApi (params) {
  cancel && cancel()

  return authRequest().get('/grant/categories', { params,
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    })
  })
}

export function detailsCategoryPrivilegesApi(categoryId){
  return authRequest().get(`/grant/categories/${categoryId}`)
}

export function storeCategoryPrivilegesApi(params){
    return authRequest().post('/grant/categories', params) 
}

export function updateCategoryPrivilegesApi(categoryId,params){
    return authRequest().put(`/grant/categories/${categoryId}`, params) 
}

export function deleteCategoryPrivilegesApi(categoryId){
    return authRequest().delete(`/grant/categories/${categoryId}`) 
}
  