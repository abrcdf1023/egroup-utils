/**
 *
 * @param {string} name
 * @param {string} value
 */
export default function setCookie(name, value) {
  const now = new Date()
  let time = now.getTime()
  time += 3600 * 1000 * 24 * 365 * 10 // 10 years
  now.setTime(time)
  document.cookie = `${name}=${value}; expires=${now.toUTCString()}; path=/`
}
