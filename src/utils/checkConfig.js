/**
 * To check is vailded config
 * 
 * @private
 * @param {String} method 
 * @param {Object} arg Customized create reducer methods(get,post,patch,delete) scheme
 */
export default function checkConfig({ take, request, success, failure }, method) {
  if (!take) throw new Error(`${method} take type undefined.`)
  if (!request) throw new Error(`${method} request type undefined.`)
  if (!success) throw new Error(`${method} success type undefined.`)
  if (!failure) throw new Error(`${method} failure type undefined.`)
}