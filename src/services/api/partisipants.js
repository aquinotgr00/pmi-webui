import axios from 'axios'
import { authRequest } from 'utils/network'

export function partisipantsApi(params){
    return authRequest().get(`/events/participants`,{ params })
}