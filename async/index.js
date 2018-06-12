const _keys = require('lodash/keys')
const _isObject = require('lodash/isObject')

module.exports.objectToQueryString = function objectToQueryString(obj) {
  if (!_isObject(obj)) {return ''}
  const query = _keys(obj)
    .filter((key) => obj[key] !== '' && obj[key] !== null)
    .map((key) => `${key}=${obj[key]}`)
    .join('&')
  return query.length > 0 ? `?${query}` : ''
}
