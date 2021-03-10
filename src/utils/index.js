function isToday (date) {
  const today = new Date()
  date = new Date(date)
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear()
}

export {
  isToday
}
