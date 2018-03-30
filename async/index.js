const _keys = require('lodash/keys')

module.exports.objectToQueryString = function objectToQueryString(obj) {
  const query = _keys(obj)
    .filter((key) => obj[key] !== '' && obj[key] !== null)
    .map((key) => `${key}=${obj[key]}`)
    .join('&')
  return query.length > 0 ? `?${query}` : null
}
