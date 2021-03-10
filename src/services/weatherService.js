import HttpService from './httpService'

export default class WeatherService {
  static async getSearchLocation (query) {
    return HttpService.get(`location/search/?query=${query}`)
  }

  static async getSearchLocationLattLong ({ coords: { latitude, longitude } }) {
    return HttpService.get(`location/search/?lattlong=${latitude},${longitude}`)
  }

  static async getLocation (woeid) {
    return HttpService.get(`location/${woeid}/`)
  }

  static async getLocationDay (woeid, date) {
    // Date in the format yyyy/mm/dd.
    return HttpService.get(`location/${woeid}/${date}/`)
  }
}
