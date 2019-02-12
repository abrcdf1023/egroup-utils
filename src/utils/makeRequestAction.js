/**
 * Make a request action
 * @private
 * @param {String} request
 * @returns {Object}
 */
export default function makeRequestAction(request) {
  return {
    [request]: state => state.set('isLoading', true),
  }
}