/**
 * Make a success action
 * @private
 * @param {String} success
 * @returns {Object}
 */
export default function makeSuccessAction(success) {
  return {
    [success]: (state, action) => {
      let newState = state.set('isLoading', false)
      if (action.payload) {
        newState.set('data', action.payload)
      }
      return newState
    },
  }
}