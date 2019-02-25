/**
 * Make a failure action
 * @private
 * @param {String} failure
 * @returns {Object}
 */
export default function makeFailureAction(failure) {
  return {
    [failure]: (state, action) => {
      let newState = state.set('isLoading', false)
      newState = newState.set('isError', true)
      if (action.payload) {
        newState = newState.set('error', action.payload)
      }
      return newState
    },
  }
}