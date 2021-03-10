import * as types from './mutationTypes'
import WeatherService from '../services/weatherService'
import HttpService from '../services/httpService'
import Vue from 'vue'

const state = {
  locationSearch: {},
  location: {
    title: 'Cleverti',
    parent: {
      title: 'Weather App'
    }
  },
  locationDay: {},
  loading: false
}

const mutations = {
  [types.SET_LOCATION_SEARCH] (state, data) {
    state.locationSearch = data
  },
  [types.SET_LOCATION] (state, data) {
    state.location = data
  },
  [types.SET_LOCATION_DAY] (state, data) {
    state.locationDay = data
  }
}

const getters = {
  locationSearch: state => state.locationSearch,
  location: state => state.location,
  locationDay: state => state.locationDay,
  defaultLocation: state => state.locationSearch.length > 0 ? state.locationSearch[0] : [],
  city: state => state.location.title,
  country: state => state.location.parent.title,
  todayForecast: state => state.location.consolidated_weather ? state.location.consolidated_weather[0] : [],
  nextFiveDayForecast: (state) => {
    if (state.location.consolidated_weather) {
      const append = {
        sun_rise: state.location.sun_rise,
        sun_set: state.location.sun_set
      }
      const newArray = state.location.consolidated_weather.map(day => Object.assign(day, append))
      return newArray
    }
    return []
  },
  loading: state => state.loading
}

const actions = {
  async getFirstLocation ({ dispatch }) {
    let coords = false
    const isGeolocation = await dispatch('checkUserPermission')
    if (isGeolocation) coords = await dispatch('getBrowserPosition')
    if (coords) dispatch('getSearchLocationLattLong', coords)
  },

  async getBrowserPosition () {
    return await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  },

  async checkUserPermission () {
    return navigator.permissions.query({ name: 'geolocation' }).then(res => res)
  },

  getSearchLocation ({ commit }, query) {
    WeatherService.getSearchLocation(query)
      .then((response) => {
        commit(types.SET_LOCATION_SEARCH, response.data)
      })
      .catch((err) => {
        HttpService.handleHttpError(Vue, err)
      })
  },

  async getSearchLocationLattLong ({ commit }, coords) {
    WeatherService.getSearchLocationLattLong(coords)
      .then((response) => {
        commit(types.SET_LOCATION_SEARCH, response.data)
      })
      .catch((err) => {
        HttpService.handleHttpError(Vue, err)
      })
  },

  getLocation ({ commit }, woeid) {
    WeatherService.getLocation(woeid)
      .then((response) => {
        commit(types.SET_LOCATION, response.data)
      })
      .catch((err) => {
        HttpService.handleHttpError(Vue, err)
      })
  },

  getLocationDay ({ commit }, woeid, date) {
    WeatherService.getLocationDay(woeid, date)
      .then((response) => {
        commit(types.SET_LOCATION_DAY, response.data)
      })
      .catch((err) => {
        HttpService.handleHttpError(Vue, err)
      })
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
