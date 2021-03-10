import * as types from './mutationTypes'
import WeatherService from '../services/weatherService'
import HttpService from '../services/httpService'
import Vue from 'vue'

const state = {
  locationSearch: {},
  location: {
    title: '--',
    parent: {
      title: '--'
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
  title: state => `${state.location.title}, ${state.location.parent.title}`,
  loading: state => state.loading
}

const actions = {
  async getBrowserPosition () {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return pos
  },

  getSearchLocation (store, query) {
    WeatherService.getSearchLocation(query)
      .then((response) => {
        store.commit(types.SET_LOCATION_SEARCH, response.data)
      })
      .catch((err) => {
        HttpService.handleHttpError(Vue, err)
      })
  },

  async getSearchLocationLattLong ({ commit, dispatch }, coords) {
    if (!coords && navigator.onLine) {
      coords = await dispatch('getBrowserPosition').catch(err => console.log(err))
    }

    WeatherService.getSearchLocationLattLong(coords)
      .then((response) => {
        commit(types.SET_LOCATION_SEARCH, response.data)
      })
      .catch((err) => {
        HttpService.handleHttpError(Vue, err)
      })
  },

  getLocation (store, woeid) {
    WeatherService.getLocation(woeid)
      .then((response) => {
        store.commit(types.SET_LOCATION, response.data)
      })
      .catch((err) => {
        HttpService.handleHttpError(Vue, err)
      })
  },

  getLocationDay (store, woeid, date) {
    WeatherService.getLocationDay(woeid, date)
      .then((response) => {
        store.commit(types.SET_LOCATION_DAY, response.data)
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
