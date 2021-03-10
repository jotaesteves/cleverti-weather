import axios from 'axios'
import { defaultConfig } from './axiosConfig'
import Vue from 'vue'

const api = axios.create(defaultConfig)

export default class HttpService {
  static async get (endpoint, params) {
    return api.get(`/api/${endpoint}`, { params: params, timeout: 60000 })
  }

  static async post (endpoint, data) {
    return api.post(`/api/${endpoint}`, { data }, { timeout: 60000 })
  }

  static handleHttpError (self, error) {
    Vue.$log.error(error)
    try {
      console.log(error.response.data._metadata.message, error.response.statusText + ' : ' + error.response.status)
      // self.$buefy.toast.open(error.response.data._metadata.message, error.response.statusText + ' : ' + error.response.status)
    } catch (e) {
      console.error('Error:', error)
      // self.$buefy.toast.open('Error:', error)
    }
  }
}
