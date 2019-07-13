import axios from 'axios'

const axiosInstanceDefaults = {
  baseURL: process.env.REACT_APP_API_URL + '/' + process.env.REACT_APP_API_PREFIX
}

export const basicRequest = () => {
  const basicAxios = axios.create(axiosInstanceDefaults)
  return basicAxios
}

let authToken

export function setAuthToken (token) {
  authToken = token
}

export function authRequest () {
  const authAxios = axios.create(axiosInstanceDefaults)
  authAxios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken
  return authAxios
}
