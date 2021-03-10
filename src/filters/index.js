// filters.js
import { isToday } from '../utils'

const round = value => Math.round(value)

const getDayOfWeek = (date) => {
  const dayOfWeek = new Date(date).getDay()
  return isNaN(dayOfWeek) ? null
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]
}

const getDayOfWeekAndToday = (date) => {
  if (isToday(date)) return 'Today'
  return getDayOfWeek(date)
}

const dateWeatherCard = (date) => {
  const newDate = new Date(date)
  const monthNames = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December']

  const day = newDate.getDate()

  const monthIndex = newDate.getMonth()
  const monthName = monthNames[monthIndex]
  /* const year = newDate.getFullYear() */

  return `${day} ${monthName}`
}

const roundTwoDecimals = (value) => Math.round((value + Number.EPSILON) * 100) / 100

const formatDate = (date) => {
  return new Date(date).toLocaleTimeString()
}

export default {
  round,
  getDayOfWeek,
  getDayOfWeekAndToday,
  dateWeatherCard,
  roundTwoDecimals,
  formatDate
}
