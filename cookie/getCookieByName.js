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
