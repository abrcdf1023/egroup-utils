const _isString = require('lodash/isString')

function _dateValid(date) {
  if (Object.prototype.toString.call(date) !== '[object Date]') {return false}
  if (isNaN(date.getTime())) {return false}
  return true
}

function parseDate(date) {
  if (!date) {return false}
  let dateEl = date
  if (_isString(dateEl)) {dateEl = new Date(dateEl)}
  if (_dateValid(dateEl)) {return dateEl}
  return false
}

module.exports.parseDate = parseDate

module.exports.formater = function formater(date, str) {
  const dateEl = parseDate(date)
  if (!dateEl) {return 'date is invalid'}

  const format = str || 'YYYY/MM/DD HH:mm:ss'

  const YYYY = dateEl.getFullYear()
  const MM = dateEl.getMonth() + 1
  const DD = dateEl.getDate()
  const HH = dateEl.getHours()
  const mm = dateEl.getMinutes()
  const ss = dateEl.getSeconds()

  const regex = /YYYY|MM|DD|HH|mm|ss/g
  const mapObj = {
    YYYY,
    MM: MM > 10 ? MM : `0${MM}`,
    DD: DD > 10 ? DD : `0${DD}`,
    HH: HH > 10 ? HH : `0${HH}`,
    mm: mm > 10 ? mm : `0${mm}`,
    ss: ss > 10 ? ss : `0${ss}`
  }

  return format.replace(regex, (matched) => mapObj[matched])
}
