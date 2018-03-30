module.exports.formater = function formater(date, format) {
  let dd = date.getDate()
  let mm = date.getMonth() + 1

  const yyyy = date.getFullYear()
  if (dd < 10) {dd = `0${dd}`}
  if (mm < 10) {mm = `0${mm}`}
  return format.replace(/yyyy/g, yyyy).replace(/mm/g, mm).replace(/dd/g, dd)
}
