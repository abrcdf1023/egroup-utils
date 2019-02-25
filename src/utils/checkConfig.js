/**
 * To check is vailded config
 * 
 * @private
 * @param {Object} arg Customized create reducer methods(get,post,patch,delete) scheme
 */
export default function checkConfig({ take, request, success, failure }) {
  if (!take) throw new Error('take type undefined.')
  if (!request) throw new Error('request type undefined.')
  if (!success) throw new Error('success type undefined.')
  if (!failure) throw new Error('failure type undefined.')
}