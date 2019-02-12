/**
 * Make a failure action
 * @private
 * @param {String} failure 
 */
export default function makeFailureAction(failure) {
  return {
    [failure]: (state, action) => state.merge({
      isLoading: false,
      isError: true,
      error: action.payload,
    }),
  }
}