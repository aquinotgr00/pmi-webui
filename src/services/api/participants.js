import axios from 'axios'
import { authRequest } from 'utils/network'

export function participantsApi(params){
    return authRequest().get(`/events/participants`,{ params })
}