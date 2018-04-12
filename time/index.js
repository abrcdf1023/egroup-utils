const _isString = require('lodash/isString')

function _dateValid(date) {
  if (Object.prototype.toString.call(date) !== '[object Date]') {return false}
  if (isNaN(date.getTime())) {return false}
  return true
}

function _parseDate(date) {
  if (!date) {return false}
  let dateEl = date
  if (_isString(dateEl)) {dateEl = new Date(dateEl)}
  if (_dateValid(dateEl)) {return dateEl}
  return false
}

module.exports.dateFormater = function dateFormater(date, str) {
  const dateEl = _parseDate(date)
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

function _secondsToHm(d) {
  const h = Math.floor(d / 3600)
  const m = Math.floor(d % 3600 / 60)
  const s = Math.floor(d % 3600 % 60)

  if (h > 0) {return h + (h === 1 ? ' hour' : ' hours')}
  if (m > 0) {return m + (m === 1 ? ' min' : ' mins')}
  if (s > 0) {return s + (s === 1 ? ' second' : ' seconds')}
}

module.exports.timeCompare = function timeCompare(date, date2) {
  const dateEl = _parseDate(date)
  const dateEl2 = _parseDate(date2)
  if (!dateEl || !dateEl2) {return 'date is invalid'}
  const seconds = Math.abs((dateEl.getTime() - dateEl2.getTime()) / 1000)
  if (seconds > 86400) {return 'yesterday'}
  return _secondsToHm(seconds)
}
