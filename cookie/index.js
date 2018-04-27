/**
 *
 * @param {string} name
 * @param {string} value
 */
module.exports.setCookie = function setCookie(name, value) {
  const now = new Date()
  let time = now.getTime()
  time += 3600 * 1000 * 24 * 365 * 10 // 10 years
  now.setTime(time)
  document.cookie = `${name}=${value}; expires=${now.toUTCString()}; path=/`
}


/**
 *
 * @param {string} name
 */
module.exports.getCookieByName = function getCookieByName(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {return parts.pop().split(';').shift()}
  return null
}


/**
 *
 * @param {string} name
 */
module.exports.deleteCookieByName = function deleteCookieByName(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}
