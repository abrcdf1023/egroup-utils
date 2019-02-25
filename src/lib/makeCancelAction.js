/**
 * Make a cancel action
 * Cancel action is not required in createFetchReducer so if the value is null
 * it'll return empty object.
 * @private
 * @param {String|null} cancel
 * @returns {Object}
 */
export default function makeCancelAction(cancel) {
  const cancelState = !cancel ?
    {} :
    {
      [cancel]: state => state.set('isLoading', false),
    }
  return cancelState
}