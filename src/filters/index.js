// filters.js
import { isToday } from '../utils'

export default {
  tempRound: value => Math.round(value),
  getDayOfWeek: (date) => {
    const dayOfWeek = new Date(date).getDay()
    if (isToday(date)) return 'Today'
    return isNaN(dayOfWeek) ? null
      : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]
  }
}
