/**
 * Make a request action
 * @private
 * @param {String} request 
 */
export default function makeRequestAction(request) {
  return {
    [request]: state => state.set('isLoading', true),
  }
}